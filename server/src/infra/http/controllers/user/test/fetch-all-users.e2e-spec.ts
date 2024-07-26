import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch All Users (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all users', async () => {
    const userFactory = new UserFactory(prisma)

    for (let i = 0; i < 10; i++) {
      await userFactory.createUser()
    }

    const response = await request(app.server).get('/users')

    expect(response.statusCode).toEqual(200)

    expect(response.body.users).toHaveLength(10)
  })
})
