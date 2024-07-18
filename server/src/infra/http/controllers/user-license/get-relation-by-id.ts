import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserLicensePresenter, userLicenseSchema } from '../../presenters/user-license-presenter'
import { errors } from '../_errors'
import { getUserLicenseByLicenseUseCase } from './factories/make-get-user-license-by-license'

export async function getRelationById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['User License'],
        summary: 'Get relation by id',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            relation: userLicenseSchema,
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

      const result = await getUserLicenseByLicenseUseCase.execute({
        licenseId: id,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { userLicense } = result.value

      return reply.status(200).send({ relation: UserLicensePresenter.toHttp(userLicense) })
    },
  )
}
