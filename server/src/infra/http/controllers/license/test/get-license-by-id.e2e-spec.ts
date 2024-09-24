import supertest from 'supertest'
import { LicenseFactory } from 'test/factories/make-license'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get license by id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get license by id', async () => {
    const licenseFactory = new LicenseFactory(prisma)
    const license = await licenseFactory.createLicense({
      userLicenseId: null,
    })

    const response = await supertest(app.server).get(`/licenses/${license.id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.license).toEqual(
      expect.objectContaining({
        id: license.id.toString(),
        name: license.name,
        quantity: license.quantity,
        enterpriseName: license.enterpriseName,
        price: license.price,
        status: license.status,
      }),
    )
  })
})
