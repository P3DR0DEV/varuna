import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Get User By Id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a user by his id', async () => {
    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser()

    const id = user.id.toString()

    const response = await request(app.server).get(`/users/${id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.user).toEqual(UserPresenter.toHttp(user))
  })
})
