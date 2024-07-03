import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { InternalServerError } from '../_errors/internal-server-error'
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
      },
    },
    async (request, reply) => {
      const { operatingSystem } = request.query

      const result = await fetchAllComputersUseCase.execute({ operatingSystem })

      if (result.isFailure()) {
        throw new InternalServerError('Internal Server Error')
      }

      const { computers } = result.value

      return reply.status(200).send({ computers: computers.map(ComputerPresenter.toHttp) })
    },
  )
}
