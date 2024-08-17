import request from 'supertest'
import { DepartmentFactory } from 'test/factories/make-department'
import { MobileFactory } from 'test/factories/make-mobile'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get Mobiles By Department (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a mobile by Department', async () => {
    const mobileFactory = new MobileFactory(prisma)
    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    for (let i = 0; i < 10; i++) {
      await mobileFactory.createMobile({
        departmentId: department.id,
      })
    }

    const response = await request(app.server).get(`/mobiles/department/${department.id}`)

    expect(response.status).toBe(200)

    expect(response.body.mobiles).toHaveLength(10)
  })
})
