import request from 'supertest'
import { DeviceFactory } from 'test/factories/make-device'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get Device by ID (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a device', async () => {
    const deviceFactory = new DeviceFactory(prisma)
    const device = await deviceFactory.createDevice()

    const id = device.id.toString()

    const response = await request(app.server).get(`/devices/${id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.device).toEqual(
      expect.objectContaining({
        serialNumber: device.serialNumber,
        model: device.model,
        acquisitionDate: device.acquisitionDate.toISOString(),
        tag: device.tag,
        invoiceNumber: device.invoiceNumber,
      }),
    )
  })
})
