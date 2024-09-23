import supertest from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { LicenseFactory } from 'test/factories/make-license'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Create User-License Relation (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a user-license relation', async () => {
    const userFactory = new UserFactory(prisma)
    const licenseFactory = new LicenseFactory(prisma)
    const departmentFactory = new DepartmentFactory(prisma)

    const department = await departmentFactory.createDepartment()
    const user = await userFactory.createUser({
      departmentId: department.id,
    })
    const license = await licenseFactory.createLicense()

    const response = await supertest(app.server).post('/user-licenses').send({
      userId: user.id.toString(),
      licenseId: license.id.toString(),
      departmentId: department.id.toString(),
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.relation).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        userId: user.id.toString(),
        licenseId: license.id.toString(),
        departmentId: department.id.toString(),
      }),
    )
  })
})
