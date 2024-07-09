import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { LicensePresenter, licenseSchema } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { getLicenseByNameUseCase } from './factories/make-get-license-by-name'

export async function getLicenseByName(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/name/:name',
    {
      schema: {
        tags: ['License'],
        summary: 'Get License By name',
        params: z.object({
          name: z.string().uuid(),
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
