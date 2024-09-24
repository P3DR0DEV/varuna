import request from 'supertest'
import { PrinterFactory } from 'test/factories/make-printer'

import { app } from '@/infra/http/app'
import { prisma } from '@/infra/lib/prisma'

describe('Fetch all printers (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should fetch all printers', async () => {
    const printerFactory = new PrinterFactory(prisma)

    for (let i = 0; i < 10; i++) {
      await printerFactory.createPrinter({
        type: 'laser',
        printing: 'colorful',
      })
    }
    const response = await request(app.server).get('/printers')

    expect(response.status).toBe(200)

    expect(response.body.printers).toHaveLength(10)
  })

  it('should fetch all printers with type dotmatrix', async () => {
    const printerFactory = new PrinterFactory(prisma)

    for (let i = 0; i < 5; i++) {
      await printerFactory.createPrinter({
        type: 'dotmatrix',
        printing: 'colorful',
      })
    }
    const response = await request(app.server).get('/printers?type=dotmatrix')

    expect(response.status).toBe(200)

    expect(response.body.printers).toHaveLength(5)
  })

  it('should fetch all printers with printing colorful', async () => {
    const response = await request(app.server).get('/printers?option=colorful')

    expect(response.status).toBe(200)

    expect(response.body.printers).toHaveLength(15)
  })
})
