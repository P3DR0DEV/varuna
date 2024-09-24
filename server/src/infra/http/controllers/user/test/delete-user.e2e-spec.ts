import request from 'supertest'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete User (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to delete a user', async () => {
    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser()

    expect(user).toBeTruthy()

    const id = user.id.toString()
    const response = await request(app.server).delete(`/users/${id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toMatchObject({
      message: 'User deleted successfully',
    })
  })
})
