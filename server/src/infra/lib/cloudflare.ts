import { S3Client } from '@aws-sdk/client-s3'

interface S3ClientConfig {
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
}

export function createS3Client({ endpoint, accessKeyId, secretAccessKey }: S3ClientConfig) {
  return new S3Client({
    region: 'auto',
    endpoint,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  })
}
