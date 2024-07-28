import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'
import { DeviceFactory } from 'test/factories/make-device'
import { IncidentFactory } from 'test/factories/make-incident'
import { WorkstationFactory } from 'test/factories/make-workstation'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Update Incident Status To Fixed (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update incident status to fixed', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const computer = await computerFactory.createPrismaComputer()

    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const workstationFactory = new WorkstationFactory(prisma)
    const workstation = await workstationFactory.createWorkstation({
      computerId: computer.id,
      departmentId: department.id,
    })

    const deviceFactory = new DeviceFactory(prisma)
    const device = await deviceFactory.createDevice()

    const incidentFactory = new IncidentFactory(prisma)

    const incident = await incidentFactory.createIncident({
      deviceId: device.id,
      workstationId: workstation.id,
    })

    const id = incident.id.toString()

    const response = await request(app.server).patch(`/incidents/${id}/fixed`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toEqual({ message: 'Incident status updated successfully' })
  })
})
