import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { LicensePresenter } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { createLicenseUseCase } from './factories/make-create-license'
import { createLicenseSchema } from './schemas'

export function createLicense(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createLicenseSchema,
    },
    async (request, reply) => {
      const props = request.body

      const result = await createLicenseUseCase.execute(props)

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { license } = result.value

      return reply.code(201).send({ license: LicensePresenter.toHttp(license) })
    },
  )
}
