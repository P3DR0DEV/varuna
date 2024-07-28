import request from 'supertest'
import { DeviceFactory } from 'test/factories/make-device'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Edit Device (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit a device', async () => {
    const deviceFactory = new DeviceFactory(prisma)
    const device = await deviceFactory.createDevice()

    const id = device.id.toString()

    const response = await request(app.server).put(`/devices/${id}`).send({
      serialNumber: device.serialNumber,
      model: device.model,
      acquisitionDate: device.acquisitionDate,
      tag: '123456',
      invoiceNumber: 'NF-123456',
      contractId: device.contractId,
      endWarrantyDate: device.endWarrantyDate,
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body.device).toEqual(
      expect.objectContaining({
        id,
        tag: '123456',
        invoiceNumber: 'NF-123456',
      }),
    )
  })
})
