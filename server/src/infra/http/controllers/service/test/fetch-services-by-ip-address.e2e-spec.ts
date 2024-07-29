import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { ServiceFactory } from 'test/factories/make-service'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch Services By Ip (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should return a list with services in a specific ip', async () => {
    const computerFactory = new ComputerFactory(prisma)
    await computerFactory.createPrismaComputer({
      ipAddress: '237.84.2.178',
    })

    const servicesFactory = new ServiceFactory(prisma)
    for (let i = 0; i < 3; i++) {
      await servicesFactory.createService({
        ipAddress: '237.84.2.178',
      })
    }

    const response = await request(app.server).get('/services/ip/237.84.2.178')

    console.log(response.body)

    expect(response.body.services).toHaveLength(3)
  })
})
