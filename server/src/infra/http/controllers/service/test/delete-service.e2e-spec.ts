import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { ServiceFactory } from 'test/factories/make-service'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete Service (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to delete a service', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const computer = await computerFactory.createPrismaComputer()

    const serviceFactory = new ServiceFactory(prisma)
    const service = await serviceFactory.createService({
      ipAddress: computer.ipAddress,
    })

    const response = await request(app.server).delete(`/services/${service.id.toString()}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      message: 'Service deleted successfully',
    })
  })
})
