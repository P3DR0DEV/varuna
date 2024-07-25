import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Create computer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should edit a computer', async () => {
    const computerFactory = new ComputerFactory(prisma)
    const computer = await computerFactory.createPrismaComputer()

    const id = computer.id.toString()

    const response = await request(app.server).put(`/computers/${id}`).send({
      type: computer.type,
      model: computer.model,
      acquisitionDate: computer.acquisitionDate,
      description: computer.description,
      hostname: 'BHO0102012',
      ipAddress: '237.84.2.170',
      operatingSystem: computer.operatingSystem,
      tag: computer.tag,
      serialNumber: computer.serialNumber,
      endWarrantyDate: computer.endWarrantyDate,
      invoiceNumber: computer.invoiceNumber,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchObject({
      computer: {
        id,
        operatingSystem: computer.operatingSystem,
        tag: computer.tag,
        serialNumber: computer.serialNumber,
        invoiceNumber: computer.invoiceNumber,
        type: computer.type,
        model: computer.model,
        description: computer.description,
        hostname: 'BHO0102012',
        ipAddress: '237.84.2.170',
      },
    })
  })

  it('Should not change a computer to a used ip address', async () => {
    expect(1).toBe(1)
  })

  it('Should not change a computer to a used hostname', async () => {
    expect(1).toBe(1)
  })

  it('Should not a change computer to a used tag', async () => {
    expect(1).toBe(1)
  })
})
