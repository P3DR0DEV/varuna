import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { getPrinterByTagUseCase } from './factories/make-get-printer-by-tag'
import { getPrinterByTagSchema } from './schemas'

export async function getPrinterByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tag/:tag',
    {
      schema: getPrinterByTagSchema,
    },
    async (request, reply) => {
      const { tag } = request.params

      const result = await getPrinterByTagUseCase.execute({ tag })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(200).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
