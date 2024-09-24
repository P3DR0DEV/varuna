import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ComputerPresenter, computersSchema } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { getComputerByIpAddressUseCase } from './factories/make-get-computer-by-ip-address'

export async function getComputerByIpAddress(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/ip/:ipAddress',
    {
      schema: {
        summary: 'Get a computer by ip address',
        tags: ['Computers'],
        params: z.object({
          ipAddress: z.string().ip({ version: 'v4' }),
        }),
        response: {
          200: z.object({
            computer: computersSchema,
          }),
        },
      },
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
