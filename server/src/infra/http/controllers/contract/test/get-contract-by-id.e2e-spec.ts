import supertest from 'supertest'
import { ContractFactory } from 'test/factories/make-contract'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Get contract by id (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get contract by id', async () => {
    const contractFactory = new ContractFactory(prisma)
    const contract = await contractFactory.createContract()

    const response = await supertest(app.server).get(`/contracts/${contract.id}`)

    expect(response.status).toBe(200)

    expect(response.body).toMatchObject({
      contract: {
        id: expect.any(String),
        description: contract.description,
        type: contract.type,
        userEmail: contract.userEmail,
        url: expect.any(String),
        fileName: contract.fileName,
        status: contract.status,
      },
    })
  })
})
