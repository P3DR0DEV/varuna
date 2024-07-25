import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get computer by ip address (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should get computer by ip address', async () => {
    const computerFactory = new ComputerFactory(prisma)

    await computerFactory.createPrismaComputer({
      ipAddress: '127.0.0.1',
    })

    const response = await request(app.server).get('/computers/ip/127.0.0.1')

    expect(response.statusCode).toEqual(200)

    expect(response.body.computer.ipAddress).toEqual('127.0.0.1')
  })

  it('Should return not found', async () => {
    const response = await request(app.server).get('/computers/ip/127.0.0.2')

    expect(response.statusCode).toEqual(404)

    expect(response.body).toMatchObject({
      name: 'NotFoundError',
      message: 'Computer not found',
    })
  })

  it('Should return bad request', async () => {
    const response = await request(app.server).get('/computers/ip/')

    expect(response.statusCode).toEqual(400)

    expect(response.body).toMatchObject({
      name: 'ZodError',
      message: 'Invalid ip',
    })
  })
})
