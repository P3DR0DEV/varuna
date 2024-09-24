import supertest from 'supertest'
import { ContractFactory } from 'test/factories/make-contract'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch all contracts (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should fetch all contracts', async () => {
    const contractFactory = new ContractFactory(prisma)

    for (let i = 0; i < 10; i++) {
      await contractFactory.createContract({ type: 'renting' })
    }

    const response = await supertest(app.server).get('/contracts').query({ type: 'renting' })

    expect(response.status).toBe(200)

    expect(response.body.contracts).toHaveLength(10)
  })

  it('should fetch all contracts', async () => {
    const contractFactory = new ContractFactory(prisma)

    for (let i = 0; i < 5; i++) {
      await contractFactory.createContract({ userEmail: 'test@test.com' })
    }

    const response = await supertest(app.server).get('/contracts').query({ userEmail: 'test@test.com' })

    expect(response.status).toBe(200)

    expect(response.body.contracts).toHaveLength(5)
  })
})
