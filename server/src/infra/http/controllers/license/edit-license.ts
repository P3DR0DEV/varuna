import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { LicensePresenter } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { editLicenseUseCase } from './factories/make-edit-license'

export async function editLicense(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['License'],
        summary: 'Edit license',
        params: z.object({
          id: z.string().uuid('Invalid ID type, must be a UUID'),
        }),
        body: z.object({
          name: z.string(),
          quantity: z.coerce.number(),
          expiresAt: z.coerce.date().nullable(),
          enterpriseName: z.string(),
          price: z.coerce.number(),
          status: z.enum(['active', 'inactive']).nullish(),
          userLicenseId: z.string().nullable(),
        }),
      },
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
