import request from "supertest"
import { app } from "@/infra/http/app"

describe('Create Mobile (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a new mobile', async () => {
    const response = await request(app.server).post('/mobiles').send({
      name: 'RH001',
      type: 'cellphone',
      acquisitionDate: '2022-02-01T00:00:00.000Z',
      serialNumber: 'MXL001',
      model: 'Samsung Galaxy S20',
      operatingSystem: 'Android 10.0',
      tag: 'BHO010203',
      numberProvider: 'Vivo',
      number: '31999999999',
      invoiceNumber: '123456',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.mobile).toEqual(
      expect.objectContaining({
      name: 'RH001',
      type: 'cellphone',
      serialNumber: 'MXL001',
      tag: 'BHO010203',
      numberProvider: 'Vivo',
      number: '31999999999',
      invoiceNumber: '123456',
    }))
  })
})