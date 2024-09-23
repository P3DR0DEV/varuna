import supertest from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'
import { WorkstationFactory } from 'test/factories/make-workstation'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch all workstations (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should fetch all workstations', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const departmentFactory = new DepartmentFactory(prisma)
    const workstationFactory = new WorkstationFactory(prisma)

    for (let i = 0; i < 10; i++) {
      const computer = await computerFactory.createPrismaComputer()
      const department = await departmentFactory.createDepartment()
      await workstationFactory.createWorkstation({
        computerId: computer.id,
        departmentId: department.id,
      })
    }

    const response = await supertest(app.server).get('/workstations')

    expect(response.statusCode).toEqual(200)

    expect(response.body.workstations.length).toEqual(10)
  })
})
