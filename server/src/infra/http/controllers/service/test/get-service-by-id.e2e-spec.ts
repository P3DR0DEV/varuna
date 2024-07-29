import request from 'supertest'
import { ServiceFactory } from 'test/factories/make-service'

import { app } from '@/infra/http/app'
import { ServicePresenter } from '@/infra/http/presenters/service-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Get Service By Id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should return a service by id', async () => {
    const serviceFactory = new ServiceFactory(prisma)
    const service = await serviceFactory.createService()

    const response = await request(app.server).get(`/services/${service.id}`)

    expect(response.body.service).toEqual(ServicePresenter.toHttp(service))
  })
})
