import supertest from 'supertest'
import { ContractFactory } from 'test/factories/make-contract'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Edit contract status (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit contract status', async () => {
    const contractFactory = new ContractFactory(prisma)
    const contract = await contractFactory.createContract()

    const response = await supertest(app.server).patch(`/contracts/${contract.id}/status`).send({ status: 'inactive' })

    expect(response.status).toBe(200)

    expect(response.body).toMatchObject({
      contract: {
        id: expect.any(String),
        description: contract.description,
        type: contract.type,
        userEmail: contract.userEmail,
        url: expect.any(String),
        fileName: contract.fileName,
        status: 'inactive',
      },
    })
  })
})
