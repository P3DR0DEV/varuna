import supertest from 'supertest'
import { LicenseFactory } from 'test/factories/make-license'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Edit License (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to edit a license', async () => {
    const licenseFactory = new LicenseFactory(prisma)
    const license = await licenseFactory.createLicense({
      userLicenseId: null,
      name: 'Office 365',
    })

    const response = await supertest(app.server).put(`/licenses/${license.id}`).send({
      name: license.name,
      quantity: '6',
      enterpriseName: license.enterpriseName,
      price: license.price,
      status: license.status,
      expiresAt: license.expiresAt,
      userLicenseId: license.userLicenseId,
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body.license).toEqual(
      expect.objectContaining({
        name: license.name,
        quantity: 6,
        enterpriseName: license.enterpriseName,
        price: license.price,
        status: license.status,
        expiresAt: license.expiresAt,
        userLicenseId: license.userLicenseId,
      }),
    )
  })
})
