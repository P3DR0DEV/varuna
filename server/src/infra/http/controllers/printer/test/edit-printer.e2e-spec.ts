import request from 'supertest'
import { PrinterFactory } from 'test/factories/make-printer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Edit printer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit printer', async () => {
    const printerFactory = new PrinterFactory(prisma)
    const printer = await printerFactory.createPrinter()

    const response = await request(app.server).put(`/printers/${printer.id}`).send({
      name: 'new-name',
      ipAddress: '192.168.1.1',
      serialNumber: '1234567890',
      tag: 'new-tag',
      type: 'laser',
      printing: 'colorful',
      model: printer.model,
      acquisitionDate: printer.acquisitionDate,
    })

    console.log(response.body)

    expect(response.status).toBe(200)

    expect(response.body.printer).toMatchObject({
      id: printer.id.toString(),
      name: 'new-name',
      ip: '192.168.1.1',
      serialNumber: '1234567890',
      tag: 'new-tag',
      type: 'laser',
      printing: 'colorful',
      model: printer.model,
    })
  })
})
