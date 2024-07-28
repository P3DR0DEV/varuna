import request from 'supertest'

import { app } from '@/infra/http/app'

describe('Create Device (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a new device', async () => {
    const response = await request(app.server).post('/devices').send({
      serialNumber: 'XL1234567',
      model: 'Switch 8 portas',
      acquisitionDate: '2022-01-01T00:00:00.000Z',
      tag: '010203',
      invoiceNumber: 'NF-123456',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body.device).toEqual(
      expect.objectContaining({
        serialNumber: 'XL1234567',
        model: 'Switch 8 portas',
        acquisitionDate: '2022-01-01T00:00:00.000Z',
        tag: '010203',
        invoiceNumber: 'NF-123456',
      }),
    )
  })
})
