import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { UserFactory } from 'test/factories/make-user'

import { app } from '@/infra/http/app'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch All Users By Department (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch all users by department', async () => {
    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser({ departmentId: department.id })

    const id = department.id.toString()

    const response = await request(app.server).get(`/users/department/${id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.users).toEqual([UserPresenter.toHttp(user)])
  })
})
