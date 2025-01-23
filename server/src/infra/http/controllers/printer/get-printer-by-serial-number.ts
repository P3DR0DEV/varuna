import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { getPrinterBySerialNumberUseCase } from './factories/make-get-printer-by-serial-number'
import { getPrinterBySerialNumberSchema } from './schemas'

export async function getPrinterBySerialNumber(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/serial-number/:serialNumber',
    {
      schema: getPrinterBySerialNumberSchema,
    },
    async (request, reply) => {
      const { serialNumber } = request.params

      const result = await getPrinterBySerialNumberUseCase.execute({ serialNumber })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(200).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
