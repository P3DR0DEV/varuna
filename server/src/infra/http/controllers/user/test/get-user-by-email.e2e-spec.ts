import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Get user by email (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should return a user', async () => {
    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser({ email: 'email@example.com' })

    const response = await request(app.server).get('/users/email/email@example.com')

    expect(response.statusCode).toEqual(200)

    expect(response.body.user).toEqual(UserPresenter.toHttp(user))
  })
})
