import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { DepartmentPresenter } from '@/infra/http/presenters/department-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Add Chief To Department (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to add chief to department', async () => {
    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser()

    const response = await request(app.server).patch(`/departments/${department.id.toString()}/chief`).send({
      userId: user.id.toString(),
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      department: {
        ...DepartmentPresenter.toHttp(department),
        id: department.id.toString(),
        chiefId: user.id.toString(),
      },
    })
  })
})
