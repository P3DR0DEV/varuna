import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { LicensePresenter, licenseSchema } from '../../presenters/license-presenter'
import { errors } from '../_errors'
import { fetchAllLicensesUseCase } from './factories/make-fetch-all-licenses'

export async function fetchAllLicenses(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: {
        tags: ['License'],
        summary: 'Fetch All Licenses',
        querystring: z.object({
          enterpriseName: z.string().optional(),
        }),
        response: {
          200: z.object({
            licenses: z.array(licenseSchema),
          }),
        },
      },
    },
    async (request, reply) => {
      const { enterpriseName } = request.query

      const result = await fetchAllLicensesUseCase.execute({ enterpriseName })

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { licenses } = result.value

      return reply.status(200).send({
        licenses: licenses.map(LicensePresenter.toHttp),
      })
    },
  )
}
