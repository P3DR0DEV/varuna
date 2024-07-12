import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { PrinterPresenter, printerSchema } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { getPrinterByIpAddressUseCase } from './factories/make-get-printer-by-ip-address'

export async function getPrinterByIP(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/ip/:ip',
    {
      schema: {
        tags: ['Printers'],
        summary: 'Get printer by ip',
        params: z.object({
          ip: z.string().ip({ version: 'v4' }),
        }),
        response: {
          200: z.object({
            printer: printerSchema,
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
          404: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { ip } = request.params

      const result = await getPrinterByIpAddressUseCase.execute({ ipAddress: ip })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { printer } = result.value

      return reply.status(200).send({ printer: PrinterPresenter.toHttp(printer) })
    },
  )
}
