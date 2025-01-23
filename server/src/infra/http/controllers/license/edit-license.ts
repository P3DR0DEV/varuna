import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { LicensePresenter } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { editLicenseUseCase } from './factories/make-edit-license'
import { editLicenseSchema } from './schemas'

export async function editLicense(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editLicenseSchema,
    },
    async (request, reply) => {
      const { id } = request.params
      const props = request.body

      const result = await editLicenseUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { license } = result.value

      return reply.status(200).send({ license: LicensePresenter.toHttp(license) })
    },
  )
}
