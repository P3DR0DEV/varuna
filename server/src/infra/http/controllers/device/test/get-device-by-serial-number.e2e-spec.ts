import request from 'supertest'
import { DeviceFactory } from 'test/factories/make-device'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get Device by Serial Number (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a device by his serial number', async () => {
    const deviceFactory = new DeviceFactory(prisma)
    const device = await deviceFactory.createDevice()

    const response = await request(app.server).get(`/devices/serial-number/${device.serialNumber}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.device).toEqual(
      expect.objectContaining({
        id: device.id.toString(),
        tag: device.tag,
        serialNumber: device.serialNumber,
      }),
    )
  })
})
