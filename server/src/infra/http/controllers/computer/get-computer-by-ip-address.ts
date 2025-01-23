import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { getComputerByIpAddressUseCase } from './factories/make-get-computer-by-ip-address'
import { getComputerByIpAddressSchema } from './schemas'

export async function getComputerByIpAddress(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/ip/:ipAddress',
    {
      schema: getComputerByIpAddressSchema,
    },
    async (request, reply) => {
      const { ipAddress } = request.params

      const result = await getComputerByIpAddressUseCase.execute({ ipAddress })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({ computer: ComputerPresenter.toHttp(computer) })
    },
  )
}
