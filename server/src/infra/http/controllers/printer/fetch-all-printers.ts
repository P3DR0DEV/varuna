import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { fetchAllPrintersUseCase } from './factories/make-fetch-all-printers'
import { fetchAllPrintersSchema } from './schemas'

export async function fetchAllPrinters(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllPrintersSchema,
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
