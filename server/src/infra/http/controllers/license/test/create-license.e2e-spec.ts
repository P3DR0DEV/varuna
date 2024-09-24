import supertest from 'supertest'

import { Slug } from '@/domain/it-manager/enterprise/entities/value-objects/slug'
import { app } from '@/infra/http/app'

describe('Create License (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a license', async () => {
    const response = await supertest(app.server).post('/licenses').send({
      name: 'Office 365',
      quantity: '1',
      enterpriseName: 'Microsoft',
      price: '100',
      status: 'active',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.license).toEqual(
      expect.objectContaining({
        name: Slug.createFromText('Office 365').value,
        quantity: 1,
        enterpriseName: 'Microsoft',
        price: 100,
        status: 'active',
      }),
    )
  })
})
