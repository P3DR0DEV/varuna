import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { PrinterPresenter, printerSchema } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { createPrinterUseCase } from './factories/make-create-printer'

export async function createPrinter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Printers'],
        summary: 'Create a new printer',
        body: z.object({
          name: z.string(),
          type: z.enum(['inkjet', 'laser', 'thermal', 'dotmatrix']),
          printing: z.enum(['colorful', 'monochrome']),
          serialNumber: z.string(),
          model: z.string(),
          tag: z.string().nullish(),
          acquisitionDate: z.coerce.date(),
          invoiceNumber: z.string().nullish(),
          endWarrantyDate: z.coerce.date().nullish(),
          observations: z.string().nullish(),
          ipAddress: z.string().ip({ version: 'v4' }).nullish(),
        }),
        response: {
          200: z.object({
            printer: printerSchema,
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const props = request.body

      const result = await createPrinterUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(200).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
