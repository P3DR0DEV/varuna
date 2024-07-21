import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ComputerPresenter, computersSchema } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { fetchAllComputersUseCase } from './factories/make-fetch-all-computers'

export async function fetchAllComputers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        summary: 'Fetch all computers',
        tags: ['Computers'],
        querystring: z.object({
          operatingSystem: z.string().nullish(),
        }),
        response: {
          200: z.object({
            computers: z.array(computersSchema),
          }),
          500: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { operatingSystem } = request.query

      const result = await fetchAllComputersUseCase.execute({ operatingSystem })

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { computers } = result.value

      return reply.status(200).send({ computers: computers.map(ComputerPresenter.toHttp) })
    },
  )
}
