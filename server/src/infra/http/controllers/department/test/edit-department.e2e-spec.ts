import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'

import { app } from '@/infra/http/app'
import { DepartmentPresenter } from '@/infra/http/presenters/department-presenter'
import { prisma } from '@/infra/lib/prisma'

describe('Edit Department (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to edit department', async () => {
    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const response = await request(app.server).put(`/departments/${department.id.toString()}`).send({
      name: 'New Department Name',
      description: 'New Department Description',
      slug: 'new-department-slug',
    })

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      department: {
        ...DepartmentPresenter.toHttp(department),
        id: department.id.toString(),
        name: 'New Department Name',
        description: 'New Department Description',
        slug: 'new-department-slug',
      },
    })
  })
})
