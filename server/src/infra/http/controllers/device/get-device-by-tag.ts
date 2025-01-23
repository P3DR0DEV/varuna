import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DevicePresenter } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { getDeviceByTagUseCase } from './factories/make-get-device-by-tag'
import { getDeviceByTagSchema } from './schemas'

export async function getDeviceByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/tag/:tag',
    {
      schema: getDeviceByTagSchema,
    },
    async (request, reply) => {
      const { tag } = request.params

      const result = await getDeviceByTagUseCase.execute({ tag })

      if (result.isFailure()) {
        const { name, message } = result.reason

        throw new errors[name](message)
      }

      const { device } = result.value

      return reply.status(200).send({ device: DevicePresenter.toHttp(device) })
    },
  )
}
