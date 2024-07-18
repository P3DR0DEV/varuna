import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { UserLicensePresenter, userLicenseSchema } from '../../presenters/user-license-presenter'
import { errors } from '../_errors'
import { createUserLicenseUseCase } from './factories/make-create-user-license'

export async function createRelation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['User License'],
        summary: 'Create user license relation',
        body: z.object({
          userId: z.string(),
          licenseId: z.string(),
          departmentId: z.string(),
        }),
        response: {
          201: z.object({
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
      const { userId, licenseId, departmentId } = request.body

      const result = await createUserLicenseUseCase.execute({
        userId,
        licenseId,
        departmentId,
      })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { userLicense } = result.value

      return reply.status(201).send({
        relation: UserLicensePresenter.toHttp(userLicense),
      })
    },
  )
}
