import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'
import { DepartmentFactory } from 'test/factories/make-department'
import { DeviceFactory } from 'test/factories/make-device'
import { WorkstationFactory } from 'test/factories/make-workstation'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Create Incident (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create an incident to a workstation', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const computer = await computerFactory.createPrismaComputer()

    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const workstationFactory = new WorkstationFactory(prisma)
    const workstation = await workstationFactory.createWorkstation({
      computerId: computer.id,
      departmentId: department.id,
    })

    const response = await request(app.server).post('/incidents').send({
      workstationId: workstation.id.toString(),
      description: 'Incident description',
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.incident).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        workstationId: workstation.id.toString(),
        description: 'Incident description',
      }),
    )
  })

  it('Should be able to create an incident to a device', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const computer = await computerFactory.createPrismaComputer()

    const departmentFactory = new DepartmentFactory(prisma)
    const department = await departmentFactory.createDepartment()

    const deviceFactory = new DeviceFactory(prisma)
    const device = await deviceFactory.createDevice()

    const workstationFactory = new WorkstationFactory(prisma)
    const workstation = await workstationFactory.createWorkstation({
      computerId: computer.id,
      departmentId: department.id,
    })

    const response = await request(app.server).post('/incidents').send({
      workstationId: workstation.id.toString(),
      description: 'Incident Device description',
      deviceId: device.id.toString(),
    })

    expect(response.statusCode).toEqual(201)

    expect(response.body.incident).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        workstationId: workstation.id.toString(),
        description: 'Incident Device description',
        deviceId: device.id.toString(),
      }),
    )
  })
})
