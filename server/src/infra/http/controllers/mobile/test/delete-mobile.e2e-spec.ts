import request from 'supertest'
import { MobileFactory } from 'test/factories/make-mobile'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete Mobile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a mobile', async () => {
    const mobileFactory = new MobileFactory(prisma)
    const mobile = await mobileFactory.createMobile()

    const response = await request(app.server).delete(`/mobiles/${mobile.id}`)

    expect(response.status).toBe(200)

    expect(response.body.message).toBe('Mobile deleted successfully')
  })
})
