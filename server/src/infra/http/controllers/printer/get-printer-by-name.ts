import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { getPrinterByNameUseCase } from './factories/make-get-printer-by-name'
import { getPrinterByNameSchema } from './schemas'

export async function getPrinterByName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/name/:name',
    {
      schema: getPrinterByNameSchema,
    },
    async (request, reply) => {
      const { name } = request.params

      const result = await getPrinterByNameUseCase.execute({ name })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(200).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
