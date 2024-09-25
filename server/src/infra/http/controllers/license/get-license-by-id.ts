import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { LicensePresenter } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { getLicenseByIdUseCase } from './factories/make-get-license-by-id'
import { getLicenseByIdSchema } from './schemas'

export async function getLicenseById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getLicenseByIdSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const result = await getLicenseByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { license } = result.value

      return reply.status(200).send({
        license: LicensePresenter.toHttp(license),
      })
    },
  )
}
