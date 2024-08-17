import request from 'supertest'
import { MobileFactory } from 'test/factories/make-mobile'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Edit Mobile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit a mobile', async () => {
    const mobileFactory = new MobileFactory(prisma)
    const mobile = await mobileFactory.createMobile()

    const response = await request(app.server).put(`/mobiles/${mobile.id}`).send({
      name: mobile.name,
      type: mobile.type,
      acquisitionDate: mobile.acquisitionDate,
      serialNumber: mobile.serialNumber,
      model: mobile.model,
      operatingSystem: mobile.operatingSystem,
      tag: 'new-tag',
    })

    expect(response.status).toBe(200)

    expect(response.body.mobile).toMatchObject({
      name: mobile.name,
      type: mobile.type,
      serialNumber: mobile.serialNumber,
      model: mobile.model,
      operatingSystem: mobile.operatingSystem,
      tag: 'new-tag',
    })
  })
})
