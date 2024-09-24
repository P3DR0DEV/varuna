import request from 'supertest'
import { MobileFactory } from 'test/factories/make-mobile'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get Mobile By Name (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a mobile by name', async () => {
    const mobileFactory = new MobileFactory(prisma)

    const mobile = await mobileFactory.createMobile()

    const response = await request(app.server).get(`/mobiles/name/${mobile.name}`)

    expect(response.status).toBe(200)

    expect(response.body.mobile).toMatchObject({
      name: mobile.name,
      type: mobile.type,
      serialNumber: mobile.serialNumber,
      model: mobile.model,
      operatingSystem: mobile.operatingSystem,
      tag: mobile.tag,
    })
  })
})
