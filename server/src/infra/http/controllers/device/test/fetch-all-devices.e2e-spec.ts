import request from 'supertest'
import { DeviceFactory } from 'test/factories/make-device'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch All Incident (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a list of all devices', async () => {
    const deviceFactory = new DeviceFactory(prisma)

    for (let i = 0; i < 10; i++) {
      await deviceFactory.createDevice()
    }
    const response = await request(app.server).get('/devices')

    expect(response.statusCode).toEqual(200)

    expect(response.body.devices).toHaveLength(10)
  })
})
