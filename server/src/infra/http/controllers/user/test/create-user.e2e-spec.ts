import request from 'supertest'

import { app } from '@/infra/http/app'

describe('Create User (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new user', async () => {
    const response = await request(app.server).post('/users/').send({
      name: 'John Doe',
      email: 'email@example.com',
      phone: '(11) 11111-1111',
      badge: '150367',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.user).toMatchObject({
      id: expect.any(String),
      name: 'John Doe',
      email: 'email@example.com',
      phone: '11111111111',
      badge: '150367',
    })
  })
})
