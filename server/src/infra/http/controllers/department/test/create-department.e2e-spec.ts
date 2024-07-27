import request from 'supertest'

import { app } from '@/infra/http/app'

describe('Create Department (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new department', async () => {
    const response = await request(app.server).post('/departments').send({
      name: 'Department Test',
      description: 'Department Test Description',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body).toEqual({
      department: {
        id: expect.any(String),
        name: 'Department Test',
        description: 'Department Test Description',
        slug: 'department-test',
      },
    })
  })
})
