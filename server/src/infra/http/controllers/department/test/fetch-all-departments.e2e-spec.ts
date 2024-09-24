import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch All Departments (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a list of departments', async () => {
    for (let i = 0; i < 10; i++) {
      const departmentFactory = new DepartmentFactory(prisma)
      await departmentFactory.createDepartment()
    }

    const response = await request(app.server).get('/departments')

    expect(response.statusCode).toEqual(200)

    expect(response.body.departments).toHaveLength(10)
  })
})
