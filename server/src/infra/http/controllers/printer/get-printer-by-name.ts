import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { PrinterPresenter, printerSchema } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { getPrinterByNameUseCase } from './factories/make-get-printer-by-name'

export async function getPrinterByName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/name/:name',
    {
      schema: {
        tags: ['Printers'],
        summary: 'Get printer by name',
        params: z.object({
          name: z.string(),
        }),
        response: {
          200: z.object({
            printer: printerSchema,
          }),
        },
      },
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
