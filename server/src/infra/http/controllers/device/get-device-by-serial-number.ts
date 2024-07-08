import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DevicePresenter, devicesSchema } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { getDeviceBySerialNumberUseCase } from './factories/make-get-device-by-serial-number'

export async function getDeviceBySerialNumber(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/serial-number/:serialNumber',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Get a device by serial number',
        params: z.object({
          serialNumber: z.string(),
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
          }),
        },
      },
    },
    async (request, reply) => {
      const { serialNumber } = request.params

      const result = await getDeviceBySerialNumberUseCase.execute({ serialNumber })

      if (result.isFailure()) {
        const { message, name } = result.reason

        throw new errors[name](message)
      }

      const { device } = result.value

      return reply.status(200).send({ device: DevicePresenter.toHttp(device) })
    },
  )
}
