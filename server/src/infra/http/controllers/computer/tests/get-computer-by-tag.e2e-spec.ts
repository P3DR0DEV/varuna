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

  it('Should get computer by tag', async () => {
    const computerFactory = new ComputerFactory(prisma)

    await computerFactory.createPrismaComputer({
      tag: 'test',
    })

    const response = await request(app.server).get('/computers/tag/test')

    expect(response.statusCode).toEqual(200)

    expect(response.body.computer.tag).toEqual('test')
  })
})
