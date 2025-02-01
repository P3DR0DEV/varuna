import supertest from 'supertest'

import { app } from '@/infra/http/app'
import { UserFactory } from 'test/factories/make-user'
import { prisma } from '@/infra/lib/prisma'
import { FileStorageMethodFactory } from 'test/factories/make-file-storage-method'

describe('Create Contract (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a contract', async () => {
    const userFactory = new UserFactory(prisma)
    const user = await userFactory.createUser()

    const fileStorageMethodFactory = new FileStorageMethodFactory(prisma)
    await fileStorageMethodFactory.createStorageMethod({
      userId: user.id,
      method: 'local',
    })

    const response = await supertest(app.server)
      .post('/contracts')
      .attach('file', './test/resources/contract.pdf')
      .field('description', 'This is a renting contract')
      .field('endsAt', new Date().toISOString())
      .field('type', 'renting')
      .field('userEmail', 'test@test.com')
      .field('status', 'active')
      .field('userId', user.id.toString())

    expect(response.status).toBe(201)

    expect(response.body).toMatchObject({
      contract: {
        id: expect.any(String),
        description: 'This is a renting contract',
        type: 'renting',
        userEmail: 'test@test.com',
        url: expect.any(String),
        fileName: expect.any(String),
        status: 'active',
        endsAt: expect.any(String),
      },
    })
  })
})
