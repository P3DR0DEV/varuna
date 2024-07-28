import request from 'supertest'
import { DeviceFactory } from 'test/factories/make-device'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get Device by Tag (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a device by his tag', async () => {
    const deviceFactory = new DeviceFactory(prisma)
    await deviceFactory.createDevice({ tag: '123456' })

    const response = await request(app.server).get('/devices/tag/123456')

    expect(response.statusCode).toEqual(200)

    expect(response.body.device).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        tag: '123456',
      }),
    )
  })
})
