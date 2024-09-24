import supertest from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { LicenseFactory } from 'test/factories/make-license'
import { UserFactory } from 'test/factories/make-user'
import { UserLicenseFactory } from 'test/factories/make-user-license'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete User-License Relation (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a user-license relation', async () => {
    const userFactory = new UserFactory(prisma)
    const licenseFactory = new LicenseFactory(prisma)
    const departmentFactory = new DepartmentFactory(prisma)
    const userLicenseFactory = new UserLicenseFactory(prisma)

    const department = await departmentFactory.createDepartment()
    const user = await userFactory.createUser({
      departmentId: department.id,
    })
    const license = await licenseFactory.createLicense()

    const userLicense = await userLicenseFactory.createUserLicense({
      licenseId: license.id,
      departmentId: department.id,
      userId: user.id,
    })

    const response = await supertest(app.server).delete(`/user-licenses/${userLicense.id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.message).toEqual('User-license relationship deleted successfully')
  })
})
