import supertest from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Create Workstation (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a workstation', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const computer = await computerFactory.createPrismaComputer()

    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const response = await supertest(app.server).post('/workstations').send({
      departmentId: department.id.toString(),
      computerId: computer.id.toString(),
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.workstation).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        departmentId: department.id.toString(),
        computerId: computer.id.toString(),
      }),
    )
  })
})
