import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Create Service (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new service', async () => {
    const computerFactory = new ComputerFactory(prisma)
    await computerFactory.createPrismaComputer({
      ipAddress: '127.0.0.1',
    })

    const response = await request(app.server).post('/services').send({
      name: 'MySQL Server',
      description: 'Database Server',
      ipAddress: '127.0.0.1',
      port: 3306,
      type: 'database',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body).toEqual({
      service: {
        id: expect.any(String),
        name: 'MySQL Server',
        description: 'Database Server',
        url: '127.0.0.1:3306',
        type: 'database',
      },
    })
  })
})
