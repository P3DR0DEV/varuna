import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { PrinterPresenter, printersToDashboardSchema } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { fetchAllPrintersUseCase } from './factories/make-fetch-all-printers'

export async function fetchAllPrinters(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['Printers'],
        summary: 'Fetch All Printers',
        querystring: z.object({
          type: z.enum(['laser', 'inkjet', 'thermal', 'dotmatrix']),
          option: z.enum(['colorful', 'monochrome']),
        }),
        response: {
          200: z.object({
            printers: z.array(printersToDashboardSchema),
          }),
        },
      },
    },
    async (request, reply) => {
      const { type, option } = request.query

      const result = await fetchAllPrintersUseCase.execute({
        type,
        option,
      })

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { printers } = result.value

      return reply.status(200).send({
        printers: printers.map(PrinterPresenter.toDashboard),
      })
    },
  )
}
