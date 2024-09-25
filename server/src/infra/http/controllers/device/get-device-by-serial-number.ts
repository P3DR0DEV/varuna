import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DevicePresenter } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { getDeviceBySerialNumberUseCase } from './factories/make-get-device-by-serial-number'
import { getDeviceBySerialNumberSchema } from './schemas'

export async function getDeviceBySerialNumber(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/serial-number/:serialNumber',
    {
      schema: getDeviceBySerialNumberSchema,
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
