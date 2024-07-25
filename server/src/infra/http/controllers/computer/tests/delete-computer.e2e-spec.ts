import request from 'supertest'
import { ComputerFactory } from 'test/factories/make-computer'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Delete computer (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should delete a computer', async () => {
    const computerFactory = new ComputerFactory(prisma)

    const computer = await computerFactory.createPrismaComputer()

    const id = computer.id.toString()

    const response = await request(app.server).delete(`/computers/${id}`)

    expect(response.statusCode).toEqual(200)

    expect(response.body).toMatchObject({
      message: 'Computer deleted successfully',
    })
  })

  it('should return 404 if computer does not exist', async () => {
    const id = new UniqueEntityID().toString()

    const response = await request(app.server).delete(`/computers/${id}`)

    expect(response.statusCode).toEqual(404)

    expect(response.body).toMatchObject({
      message: 'This computer does not exist or already has been deleted',
    })
  })

  it('should return 404 on multiple deletes', async () => {
    const computerFactory = new ComputerFactory(prisma)

    const computer = await computerFactory.createPrismaComputer()

    const id = computer.id.toString()

    await request(app.server).delete(`/computers/${id}`)

    const response = await request(app.server).delete(`/computers/${id}`)

    expect(response.statusCode).toEqual(404)

    expect(response.body).toMatchObject({
      message: 'This computer does not exist or already has been deleted',
    })
  })

  it('should return 400 if id is invalid', async () => {
    const id = ''

    const response = await request(app.server).delete(`/computers/${id}`)

    expect(response.statusCode).toEqual(400)

    expect(response.body).toMatchObject({
      name: 'ZodError',
      message: 'Invalid ID type, must be a UUID',
    })
  })
})
