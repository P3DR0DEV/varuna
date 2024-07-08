import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { DevicePresenter, devicesSchema } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { createDeviceUseCase } from './factories/make-create-device'

export async function createDevice(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Create a new device',
        body: z.object({
          serialNumber: z.string(),
          model: z.string(),
          acquisitionDate: z.coerce.date(),
          invoiceNumber: z.string().nullish(),
        }),
        response: {
          201: z.object({ device: devicesSchema }),
          400: z.object({ name: z.string(), message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const props = request.body

      const result = await createDeviceUseCase.execute({ ...props })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { device } = result.value

      return reply.status(201).send({ device: DevicePresenter.toHttp(device) })
    },
  )
}
