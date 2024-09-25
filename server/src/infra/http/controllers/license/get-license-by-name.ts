import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { LicensePresenter } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { getLicenseByNameUseCase } from './factories/make-get-license-by-name'
import { getLicenseByNameSchema } from './schemas'

export async function getLicenseByName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/name/:name',
    {
      schema: getLicenseByNameSchema,
    },
    async (request, reply) => {
      const { name } = request.params

      const result = await getLicenseByNameUseCase.execute({ name })

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
