import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { makeFileStorageMethod } from 'test/factories/make-file-storage-method'
import { makeUser } from 'test/factories/make-user'
import { InMemoryFileStorageMethodRepository } from 'test/repositories/in-memory-file-storage-method-repository'
import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'

import { env } from '@/env'

import { UploadFileToStorageUseCase } from '../upload-file-to-storage'

let usersRepository: InMemoryUsersRepository
let repository: InMemoryFileStorageMethodRepository
let sut: UploadFileToStorageUseCase

describe('Upload File To Storage Use Case', () => {
  it('should upload a file to local storage', async () => {
    usersRepository = new InMemoryUsersRepository()
    repository = new InMemoryFileStorageMethodRepository()

    const user = makeUser()
    await usersRepository.create(user)

    const fileStorageMethod = makeFileStorageMethod({
      userId: user.id,
      method: 'local',
    })
    await repository.create(fileStorageMethod)

    const filePath = resolve(process.cwd(), 'test', 'resources', 'contract.pdf')
    const fileBuffer = readFileSync(filePath)

    const file = new File([fileBuffer], 'contract.pdf', {
      type: 'application/pdf',
    })
    sut = new UploadFileToStorageUseCase(repository, usersRepository)

    const response = await sut.execute({
      userId: user.id.toString(),
      file,
    })

    expect(response.isSuccess()).toBe(true)
  })

  it('should upload a file to r2 storage', async () => {
    usersRepository = new InMemoryUsersRepository()
    repository = new InMemoryFileStorageMethodRepository()

    const user = makeUser()
    await usersRepository.create(user)

    const fileStorageMethod = makeFileStorageMethod({
      userId: user.id,
      method: 'r2',
      endpoint: env.S3_ENDPOINT,
      accessKeyId: env.S3_ACCESS_KEY_ID,
      secretAccessKey: env.S3_SECRET_ACCESS_KEY,
      bucket: env.S3_BUCKET,
    })

    await repository.create(fileStorageMethod)

    const filePath = resolve(process.cwd(), 'test', 'resources', 'contract.pdf')
    const fileBuffer = readFileSync(filePath)

    const file = new File([fileBuffer], 'contract.pdf', {
      type: 'application/pdf',
    })

    sut = new UploadFileToStorageUseCase(repository, usersRepository)

    const response = await sut.execute({
      userId: user.id.toString(),
      file,
    })

    expect(response.isSuccess()).toBe(true)
  })
})
