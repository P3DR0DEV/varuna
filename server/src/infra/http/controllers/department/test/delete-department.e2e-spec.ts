import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete Department (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a department', async () => {
    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const id = department.id.toString()

    const response = await request(app.server).delete(`/departments/${id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      message: 'Department deleted successfully',
    })
  })
})
