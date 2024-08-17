import request from 'supertest'
import { PrinterFactory } from 'test/factories/make-printer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get printer by ID (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get printer by ID', async () => {
    const printerFactory = new PrinterFactory(prisma)
    const printer = await printerFactory.createPrinter()

    const response = await request(app.server).get(`/printers/${printer.id}`)

    expect(response.status).toBe(200)

    expect(response.body.printer).toMatchObject({
      id: printer.id.toString(),
      name: printer.name,
      ip: printer.ipAddress,
      serialNumber: printer.serialNumber,
      tag: printer.tag,
      type: printer.type,
      printing: printer.printing,
    })
  })
})
