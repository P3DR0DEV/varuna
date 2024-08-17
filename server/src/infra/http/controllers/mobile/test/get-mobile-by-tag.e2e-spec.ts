import request from 'supertest'
import { MobileFactory } from 'test/factories/make-mobile'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get Mobile By Tag (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a mobile by tag', async () => {
    const mobileFactory = new MobileFactory(prisma)

    const mobile = await mobileFactory.createMobile({
      tag: 'tag',
    })

    const response = await request(app.server).get(`/mobiles/tag/${mobile.tag}`)

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
