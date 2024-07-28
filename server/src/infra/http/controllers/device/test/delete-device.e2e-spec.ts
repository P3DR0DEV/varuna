import request from 'supertest'
import { DeviceFactory } from 'test/factories/make-device'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete Incident (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a device', async () => {
    const deviceFactory = new DeviceFactory(prisma)
    const device = await deviceFactory.createDevice()

    const id = device.id

    const response = await request(app.server).delete(`/devices/${id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      message: 'Device deleted successfully',
    })
  })
})
