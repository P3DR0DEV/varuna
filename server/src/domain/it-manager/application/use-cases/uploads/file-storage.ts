import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import axios from 'axios'

import { BadRequest, type BadRequestError } from '@/core/errors/bad-request'
import { type Either, failure, success } from '@/core/types/either'
import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { createS3Client } from '@/infra/lib/cloudflare'

interface UploadFileToR2UseCaseProps {
  file: File
  endpoint: string
  bucket: string
  accessKeyId: string
  secretAccessKey: string
  name: string
}

type UploadFileUseCaseResponse = Either<BadRequestError, string>

export class UploadFileUseCase {
  static async uploadLocalFile(file: File, name: string): Promise<UploadFileUseCaseResponse> {
    // Create the uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads')

    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir)
    }

    // Generate a unique file name
    const random = Math.floor(Math.random() * 1000000)
    const fileName = `contract-${random}_${Slug.createFromText(name).value}.${file.type.split('/')[1]}`

    const filePath = path.join(uploadsDir, fileName)

    // Use toBuffer() to get the file's data as a buffer
    const fileBuffer = Buffer.from(await file.arrayBuffer())

    // Write the buffer directly to the file system
    writeFileSync(filePath, fileBuffer)

    return success(fileName)
  }

  static async uploadR2File({
    file,
    endpoint,
    bucket,
    accessKeyId,
    secretAccessKey,
    name,
  }: UploadFileToR2UseCaseProps): Promise<UploadFileUseCaseResponse> {
    const bannedMimeTypes = [
      '.exe', // (executáveis)
      '.dll', // (bibliotecas dinâmicas)
      '.bat', // (arquivos de lote)
      '.cmd', // (arquivos de comando)
      '.sh', // (scripts shell)
      '.cgi', // (scripts cgi)
      '.jar', // (arquivos jars)
      '.app', // (aplicativos)
    ]

    if (bannedMimeTypes.includes(file.type)) {
      return failure(BadRequest('File type not allowed'))
    }

    const random = Math.floor(Math.random() * 1000000)
    const fileKey = `contract-${random}_${Slug.createFromText(name).value}.${file.type.split('/')[1]}`
    const fileType = file.type

    const r2 = createS3Client({
      endpoint,
      accessKeyId,
      secretAccessKey,
    })

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: bucket,
        Key: fileKey,
        ContentType: fileType,
        ACL: 'public-read',
      }),
      { expiresIn: 600 }, // 10 minutes
    )

    const buffer = Buffer.from(await file.arrayBuffer())

    try {
      const response = await axios.put(signedUrl, buffer, {
        headers: {
          'Content-Type': fileType,
        },
      })

      if (response.status !== 200) {
        throw new Error('Failed to upload file')
      }

      return success(fileKey)
    } catch (error) {
      console.log({ error })
      throw error
    }
  }
}
