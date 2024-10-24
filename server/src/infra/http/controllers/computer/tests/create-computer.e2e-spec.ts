import request from 'supertest'

import { app } from '@/infra/http/app'

describe('Create computer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should create a computer', async () => {
    const response = await request(app.server).post('/computers').send({
      type: 'desktop',
      model: 'any_model',
      acquisitionDate: '2022-01-01',
      description: 'any_description',
      hostname: 'BHO0102012',
      ipAddress: '237.84.2.170',
      operatingSystem: 'Windows 11 Pro',
      tag: 'any_tag',
      serialNumber: 'any_serial_number',
      endWarrantyDate: '2028-01-01',
      invoiceNumber: 'any_invoice_number',
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toMatchObject({
      computer: {
        id: expect.any(String),
        type: 'desktop',
        model: 'any_model',
        description: 'any_description',
        hostname: 'BHO0102012',
        ipAddress: '237.84.2.170',
        operatingSystem: 'windows-11-pro',
        tag: 'any_tag',
        contractId: null,
        serialNumber: 'any_serial_number',
        invoiceNumber: 'any_invoice_number',
      },
    })
  })
})
