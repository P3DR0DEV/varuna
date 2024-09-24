import request from 'supertest'

import { app } from '@/infra/http/app'

describe('Create Printer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should create a printer', async () => {
    const response = await request(app.server).post('/printers').send({
      name: 'Test Printer',
      type: 'inkjet',
      printing: 'monochrome',
      serialNumber: 'P-1234567890',
      model: 'Test Model',
      tag: 'bho0201023',
      acquisitionDate: '2022-01-01',
      ipAddress: '127.0.0.1',
    })

    expect(response.status).toBe(201)

    expect(response.body.printer).toMatchObject({
      id: expect.any(String),
      name: 'Test Printer',
      type: 'inkjet',
      printing: 'monochrome',
      serialNumber: 'P-1234567890',
      model: 'Test Model',
      tag: 'bho0201023',
      ip: '127.0.0.1',
    })
  })
})
