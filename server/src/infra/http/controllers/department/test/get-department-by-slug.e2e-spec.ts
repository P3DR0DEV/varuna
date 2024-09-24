import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'

import { app } from '@/infra/http/app'
import { DepartmentPresenter } from '@/infra/http/presenters/department-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Get Department by Slug (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a department by slug', async () => {
    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const response = await request(app.server).get(`/departments/${department.slug.value}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      department: {
        ...DepartmentPresenter.toHttp(department),
      },
    })
  })
})
