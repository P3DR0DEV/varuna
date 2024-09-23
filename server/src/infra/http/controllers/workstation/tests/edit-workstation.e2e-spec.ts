import supertest from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'
import { WorkstationFactory } from 'test/factories/make-workstation'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Edit Workstation (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit a workstation', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const departmentFactory = new DepartmentFactory(prisma)
    const workstationFactory = new WorkstationFactory(prisma)

    const computer = await computerFactory.createPrismaComputer()
    const department = await departmentFactory.createDepartment()
    const workstation = await workstationFactory.createWorkstation({
      computerId: computer.id,
      departmentId: department.id,
    })

    const computer2 = await computerFactory.createPrismaComputer()

    const response = await supertest(app.server).put(`/workstations/${workstation.id}`).send({
      departmentId: department.id.toString(),
      computerId: computer2.id.toString(),
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.workstation).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        departmentId: department.id.toString(),
        computerId: computer2.id.toString(),
      }),
    )
  })
})
