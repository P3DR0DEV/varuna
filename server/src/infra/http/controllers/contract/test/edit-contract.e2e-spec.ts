import supertest from 'supertest'
import { ContractFactory } from 'test/factories/make-contract'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Edit Contract (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should edit a contract', async () => {
    const contractFactory = new ContractFactory(prisma)
    const contract = await contractFactory.createContract()

    const response = await supertest(app.server)
      .put(`/contracts/${contract.id}`)
      .attach('file', './test/resources/contract.pdf')
      .field('description', contract.description)
      .field('endsAt', new Date().toISOString())
      .field('type', contract.type)
      .field('userEmail', contract.userEmail)
      .field('status', contract.status)

    expect(response.status).toBe(200)

    expect(response.body).toMatchObject({
      contract: {
        id: expect.any(String),
        description: contract.description,
        type: contract.type,
        userEmail: contract.userEmail,
        url: expect.any(String),
        fileName: 'contract.pdf',
        status: 'active',
        endsAt: expect.any(String),
      },
    })
  })
})
