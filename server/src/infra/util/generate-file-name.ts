import { extname } from 'path'

export function generateFileName(file: any) {
  const date = new Date()
  const random = () => Math.floor(Math.random() * 10000 + 10000)

  return `contract-${date.toISOString()}_${random()}${extname(file.filename)}`
}
