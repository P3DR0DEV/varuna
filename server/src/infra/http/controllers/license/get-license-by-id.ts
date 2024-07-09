import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { LicensePresenter, licenseSchema } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { getLicenseByIdUseCase } from './factories/make-get-license-by-id'

export async function getLicenseById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['License'],
        summary: 'Get License By Id',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            license: licenseSchema,
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
