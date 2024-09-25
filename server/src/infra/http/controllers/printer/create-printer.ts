import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { createPrinterUseCase } from './factories/make-create-printer'
import { createPrinterSchema } from './schemas'

export async function createPrinter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createPrinterSchema,
    },
    async (request, reply) => {
      const props = request.body

      const result = await createPrinterUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(201).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
