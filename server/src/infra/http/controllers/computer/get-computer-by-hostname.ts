import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ComputerPresenter, computersSchema } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { getComputerByHostnameUseCase } from './factories/make-get-computer-by-hostname'

export async function getComputerByHostname(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/hostname/:hostname',
    {
      schema: {
        summary: 'Get a computer by hostname',
        tags: ['Computers'],
        params: z.object({
          hostname: z.string(),
        }),
        response: {
          200: z.object({
            computer: computersSchema,
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
      const { hostname } = request.params

      const result = await getComputerByHostnameUseCase.execute({ hostname })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({ computer: ComputerPresenter.toHttp(computer) })
    },
  )
}
