import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { getPrintersByIdUseCase } from './factories/make-get-printer-by-id'
import { getPrinterByIdSchema } from './schemas'

export async function getPrinterById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getPrinterByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getPrintersByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(200).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
