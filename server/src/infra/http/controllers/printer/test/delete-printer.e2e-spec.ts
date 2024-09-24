import request from 'supertest'
import { PrinterFactory } from 'test/factories/make-printer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete printer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete printer', async () => {
    const printerFactory = new PrinterFactory(prisma)
    const printer = await printerFactory.createPrinter()

    const response = await request(app.server).delete(`/printers/${printer.id}`)

    expect(response.status).toBe(200)

    expect(response.body.message).toBe('Printer deleted successfully')
  })
})
