import supertest from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'
import { WorkstationFactory } from 'test/factories/make-workstation'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete Workstation (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should delete a workstation', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const departmentFactory = new DepartmentFactory(prisma)
    const workstationFactory = new WorkstationFactory(prisma)

    const computer = await computerFactory.createPrismaComputer()
    const department = await departmentFactory.createDepartment()
    const workstation = await workstationFactory.createWorkstation({
      computerId: computer.id,
      departmentId: department.id,
    })

    const response = await supertest(app.server).delete(`/workstations/${workstation.id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.message).toEqual('Workstation deleted successfully')
  })
})
