import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DevicePresenter } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { getDeviceByIdUseCase } from './factories/make-get-device-by-id'
import { getDeviceByIdSchema } from './schemas'

export async function getDeviceById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/:id',
    {
      schema: getDeviceByIdSchema,
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
