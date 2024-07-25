import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get computer by hostname (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should get computer by hostname', async () => {
    const computerFactory = new ComputerFactory(prisma)

    await computerFactory.createPrismaComputer({
      hostname: 'BHO010203',
    })

    const response = await request(app.server).get('/computers/hostname/BHO010203')

    expect(response.statusCode).toEqual(200)

    expect(response.body).toMatchObject({
      computer: expect.objectContaining({
        id: expect.any(String),
        hostname: 'BHO010203',
      }),
    })
  })

  it('Should return not found', async () => {
    const response = await request(app.server).get('/computers/hostname/BHO010201')

    expect(response.statusCode).toEqual(404)

    expect(response.body).toMatchObject({
      name: 'NotFoundError',
      message: 'Computer not found',
    })
  })

  it('Should return bad request', async () => {
    const response = await request(app.server).get('/computers/hostname/')

    expect(response.statusCode).toEqual(400)

    expect(response.body).toMatchObject({
      name: 'BadRequestError',
      message: 'Hostname is required',
    })
  })
})
