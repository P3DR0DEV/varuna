import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Get User By Badge (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should return a user', async () => {
    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser({ badge: '150367' })

    const response = await request(app.server).get('/users/badge/150367')

    expect(response.statusCode).toEqual(200)

    expect(response.body.user).toEqual(UserPresenter.toHttp(user))
  })
})
