import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Edit User (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit a user', async () => {
    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser()

    const id = user.id.toString()

    const response = await request(app.server)
      .put(`/users/${id}`)
      .send({
        name: 'updatedName',
        badge: user.badge,
        email: 'updatedEmail@email.com',
        phone: user.phone?.value,
        departmentId: user.departmentId?.toString() ?? null,
      })

    expect(response.statusCode).toEqual(200)

    expect(response.body.user).toEqual({
      ...UserPresenter.toHttp(user),
      name: 'updatedName',
      email: 'updatedEmail@email.com',
    })
  })
})
