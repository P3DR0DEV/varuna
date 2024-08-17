import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { editPrinterUseCase } from './factories/make-edit-printer'

export async function editPrinter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Printers'],
        summary: 'Edit Printer',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        body: z.object({
          name: z.string(),
          type: z.enum(['inkjet', 'laser', 'thermal', 'dotmatrix']),
          printing: z.enum(['colorful', 'monochrome']),
          tag: z.string().nullish(),
          ipAddress: z.string().ip({ version: 'v4' }).nullish(),
          observations: z.string().nullish(),
          serialNumber: z.string(),
          model: z.string(),
          endWarrantyDate: z.coerce.date().nullish(),
          invoiceNumber: z.string().nullish(),
          acquisitionDate: z.coerce.date(),
        }),
      },
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
