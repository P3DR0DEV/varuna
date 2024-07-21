import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserLicensePresenter, userLicenseSchema } from '../../presenters/user-license-presenter'
import { errors } from '../_errors'
import { fetchUserLicenseByUserUseCase } from './factories/fetch-user-licenses-by-user'

export async function fetchRelationByUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/user/:id',
    {
      schema: {
        tags: ['User License'],
        summary: 'Fetch relation by user',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        response: {
          200: z.object({
            relations: z.array(userLicenseSchema),
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
      const { id } = request.params

      const result = await fetchUserLicenseByUserUseCase.execute({
        userId: id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { userLicense } = result.value

      return reply.status(200).send({
        relations: userLicense.map(UserLicensePresenter.toHttp),
      })
    },
  )
}
