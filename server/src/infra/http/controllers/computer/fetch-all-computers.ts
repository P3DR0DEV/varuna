import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { ComputerPresenter } from '../../presenters/computer-presenter'
import { errors } from '../_errors'
import { fetchAllComputersUseCase } from './factories/make-fetch-all-computers'
import { fetchAllComputersSchema } from './schemas'

export async function fetchAllComputers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllComputersSchema,
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
