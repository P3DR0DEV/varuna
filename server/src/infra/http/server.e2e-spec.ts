import request from 'supertest'

import { app } from './app'

describe('Test Running Server', () => {
  test('Should return ok (E2E)', async () => {
    await app.ready()

    const response = await request(app.server).get('/')

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      name: 'IT Manager API',
      version: '1.0.0',
      description: 'IT Manager API',
      status: 'OK',
    })
  })
})
