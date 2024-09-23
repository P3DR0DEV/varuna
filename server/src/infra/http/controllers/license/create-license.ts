import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { LicensePresenter, licenseSchema } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { createLicenseUseCase } from './factories/make-create-license'

export function createLicense(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['License'],
        summary: 'Create License',
        body: z.object({
          name: z.string(),
          quantity: z.coerce.number(),
          enterpriseName: z.string(),
          price: z.coerce.number(),
          status: z.enum(['active', 'inactive']).nullish(),
          userLicenseId: z.string().nullish(),
        }),
        response: {
          201: z.object({
            license: licenseSchema,
          }),
          400: z.object({
            name: z.string(),
            message: z.string(),
          }),
        },
      },
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
