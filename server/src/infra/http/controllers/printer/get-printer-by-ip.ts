import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { PrinterPresenter } from '../../presenters/printer-presenter'
import { errors } from '../_errors'
import { getPrinterByIpAddressUseCase } from './factories/make-get-printer-by-ip-address'
import { getPrinterByIpAddressSchema } from './schemas'

export async function getPrinterByIP(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/ip/:ip',
    {
      schema: getPrinterByIpAddressSchema,
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
