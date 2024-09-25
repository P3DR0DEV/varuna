import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { UserLicensePresenter } from '../../presenters/user-license-presenter'
import { errors } from '../_errors'
import { createUserLicenseUseCase } from './factories/make-create-user-license'
import { createUserLicenseRelationSchema } from './schemas'

export async function createRelation(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createUserLicenseRelationSchema,
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
