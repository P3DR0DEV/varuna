import request from 'supertest'
import { ServiceFactory } from 'test/factories/make-service'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch All Services (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should return a list with all services', async () => {
    const servicesFactory = new ServiceFactory(prisma)
    for (let i = 0; i < 10; i++) {
      await servicesFactory.createService({
        type: 'infra',
      })
    }

    const response = await request(app.server).get('/services')

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      services: expect.any(Array),
    })

    expect(response.body.services).toHaveLength(10)
  })

  it('Should return a list with database services', async () => {
    const servicesFactory = new ServiceFactory(prisma)
    for (let i = 0; i < 10; i++) {
      await servicesFactory.createService({
        type: 'infra',
      })
    }

    for (let i = 0; i < 5; i++) {
      await servicesFactory.createService({
        type: 'database',
      })
    }

    const response = await request(app.server).get('/services').query({ type: 'database' })

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      services: expect.any(Array),
    })

    expect(response.body.services).toHaveLength(5)
  })
})
