import request from 'supertest'
import { ServiceFactory } from 'test/factories/make-service'

import { app } from '@/infra/http/app'
import { ServicePresenter } from '@/infra/http/presenters/service-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Edit Service (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should edit a service', async () => {
    const serviceFactory = new ServiceFactory(prisma)
    const service = await serviceFactory.createService()

    const response = await request(app.server).put(`/services/${service.id}`).send({
      description: service.description,
      ipAddress: service.ipAddress,
      name: 'New Name',
      port: service.port,
      type: 'infra',
    })

    expect(response.status).toBe(200)

    expect(response.body.service).toEqual({
      ...ServicePresenter.toHttp(service),
      type: 'infra',
      name: 'New Name',
    })
  })
})
