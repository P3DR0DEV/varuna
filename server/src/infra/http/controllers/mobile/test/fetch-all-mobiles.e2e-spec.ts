import request from 'supertest'
import { MobileFactory } from 'test/factories/make-mobile'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch All Mobiles (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should fetch all mobiles', async () => {
    const mobileFactory = new MobileFactory(prisma)

    for (let i = 0; i < 10; i++) {
      await mobileFactory.createMobile({ type: 'tablet' })
    }

    const response = await request(app.server).get('/mobiles')

    expect(response.status).toBe(200)

    expect(response.body.mobiles).toHaveLength(10)
  })

  it('should fetch all cellphones', async () => {
    const mobileFactory = new MobileFactory(prisma)

    for (let i = 0; i < 5; i++) {
      await mobileFactory.createMobile({ type: 'cellphone' })
    }

    const response = await request(app.server).get('/mobiles?type=cellphone')

    expect(response.status).toBe(200)

    expect(response.body.mobiles).toHaveLength(5)
  })
})
