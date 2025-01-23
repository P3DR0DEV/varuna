import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DevicePresenter } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { editDeviceUseCase } from './factories/make-edit-device'
import { editDeviceSchema } from './schemas'

export async function editDevice(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: editDeviceSchema,
    },
    async (request, reply) => {
      const { id } = request.params

      const props = request.body

      const result = await editDeviceUseCase.execute({ id, ...props })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { device } = result.value

      return reply.status(200).send({ device: DevicePresenter.toHttp(device) })
    },
  )
}
