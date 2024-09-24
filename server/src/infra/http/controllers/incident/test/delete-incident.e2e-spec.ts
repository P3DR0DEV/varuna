import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'
import { IncidentFactory } from 'test/factories/make-incident'
import { WorkstationFactory } from 'test/factories/make-workstation'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete Incident (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete an incident', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const computer = await computerFactory.createPrismaComputer()

    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const workstationFactory = new WorkstationFactory(prisma)
    const workstation = await workstationFactory.createWorkstation({
      computerId: computer.id,
      departmentId: department.id,
    })

    const incidentFactory = new IncidentFactory(prisma)
    const incident = await incidentFactory.createIncident({
      deviceId: null,
      workstationId: workstation.id,
    })

    const response = await request(app.server).delete(`/incidents/${incident.id.toString()}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({
      message: 'Incident deleted successfully',
    })
  })
})
