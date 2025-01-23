import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { editPrinterUseCase } from './factories/make-edit-printer'
import { editPrinterSchema } from './schemas'

export async function editPrinter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editPrinterSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editPrinterUseCase.execute({
        id,
        tag: props.tag ?? null,
        ...props,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(200).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
