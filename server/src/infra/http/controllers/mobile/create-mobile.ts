import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { MobilePresenter, mobileSchema } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { createMobileUseCase } from './factories/make-create-mobile'

export async function createMobile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Mobiles'],
        summary: 'Create a new mobile',
        body: z.object({
          name: z.string(),
          type: z.enum(['tablet', 'cellphone']),
          acquisitionDate: z.coerce.date(),
          serialNumber: z.string(),
          model: z.string(),
          operatingSystem: z.string(),
          departmentId: z.string(),
          numberProvider: z.string().nullish(),
          endWarrantyDate: z.coerce.date().nullish(),
          number: z.string().nullish(),
          invoiceNumber: z.string().nullish(),
          contractId: z.string().nullish(),
        }),
        response: {
          201: z.object({
            mobile: mobileSchema,
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
      const props = request.body

      const result = await createMobileUseCase.execute(props)

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { mobile } = result.value

      return reply.status(201).send({
        mobile: MobilePresenter.toHttp(mobile),
      })
    },
  )
}
