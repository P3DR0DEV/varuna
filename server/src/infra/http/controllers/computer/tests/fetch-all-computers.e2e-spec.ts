import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'

import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch all computers (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should fetch all computers', async () => {
    for (let i = 0; i < 10; i++) {
      const computerFactory = new ComputerFactory(prisma)

      await computerFactory.createPrismaComputer()
    }

    const response = await request(app.server).get('/computers')

    expect(response.statusCode).toEqual(200)

    expect(response.body).toMatchObject({
      computers: expect.any(Array),
    })
  })

  it('Should fetch computers by operating system', async () => {
    for (let i = 0; i < 10; i++) {
      const computerFactory = new ComputerFactory(prisma)

      await computerFactory.createPrismaComputer({
        operatingSystem: Slug.createFromText('Windows 11'),
      })
    }

    const response = await request(app.server).get('/computers').query({ operatingSystem: 'Windows 11' })

    expect(response.statusCode).toEqual(200)

    expect(response.body.computers).toHaveLength(10)
  })
})
