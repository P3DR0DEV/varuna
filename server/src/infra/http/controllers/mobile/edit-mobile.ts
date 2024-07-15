import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { MobilePresenter, mobileSchema } from '../../presenters/mobile-presenter'
import { errors } from '../_errors'
import { editMobileUseCase } from './factories/make-edit-mobile'

export async function editMobile(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Mobiles'],
        summary: 'Edit mobile',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          name: z.string(),
          type: z.enum(['tablet', 'cellphone']),
          acquisitionDate: z.coerce.date(),
          serialNumber: z.string(),
          model: z.string(),
          operatingSystem: z.string(),
          tag: z.string().nullish(),
          number: z.string().nullish(),
          endWarrantyDate: z.coerce.date().nullish(),
          invoiceNumber: z.string().nullish(),
          numberProvider: z.string().nullish(),
          departmentId: z.string().nullish(),
          contractId: z.string().nullish(),
        }),
        response: {
          200: z.object({
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
      const { id } = request.params
      const props = request.body

      const result = await editMobileUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { mobile } = result.value

      return reply.status(200).send({
        mobile: MobilePresenter.toHttp(mobile),
      })
    },
  )
}
