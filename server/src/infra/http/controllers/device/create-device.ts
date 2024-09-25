import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DevicePresenter } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { createDeviceUseCase } from './factories/make-create-device'
import { createDeviceSchema } from './schemas'

export async function createDevice(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: createDeviceSchema,
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
