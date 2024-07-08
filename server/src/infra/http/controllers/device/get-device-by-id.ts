import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DevicePresenter, devicesSchema } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { getDeviceByIdUseCase } from './factories/make-get-device-by-id'

export async function getDeviceById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Get a device by id',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            device: devicesSchema,
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

      const result = await getDeviceByIdUseCase.execute({ id })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { device } = result.value
      return reply.status(200).send({ device: DevicePresenter.toHttp(device) })
    },
  )
}
