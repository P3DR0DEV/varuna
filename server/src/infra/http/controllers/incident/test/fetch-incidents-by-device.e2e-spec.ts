import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'
import { DeviceFactory } from 'test/factories/make-device'
import { IncidentFactory } from 'test/factories/make-incident'
import { WorkstationFactory } from 'test/factories/make-workstation'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch Incidents by device (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return a list of 10 incidents', async () => {
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
    for (let i = 0; i < 10; i++) {
      await incidentFactory.createIncident({
        deviceId: device.id,
        workstationId: workstation.id,
      })
    }

    const response = await request(app.server).get(`/incidents/device/${device.id.toString()}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body.incidents).toHaveLength(10)
  })
})
