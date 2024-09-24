import supertest from 'supertest'
import { LicenseFactory } from 'test/factories/make-license'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch all licenses (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to fetch all licenses', async () => {
    const licenseFactory = new LicenseFactory(prisma)
    const license = await licenseFactory.createLicense({
      userLicenseId: null,
    })

    const response = await supertest(app.server).get('/licenses')

    expect(response.statusCode).toEqual(200)

    expect(response.body.licenses).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: license.id.toString(),
          name: license.name,
          quantity: license.quantity,
          enterpriseName: license.enterpriseName,
          price: license.price,
          status: license.status,
        }),
      ]),
    )
  })
})
