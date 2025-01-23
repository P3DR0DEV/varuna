import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

import { DevicePresenter } from '../../presenters/device-presenter'
import { errors } from '../_errors'
import { fetchAllDevicesUseCase } from './factories/make-fetch-all-devices'
import { fetchAllDevicesSchema } from './schemas'

export async function fetchAllDevices(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/',
    {
      schema: fetchAllDevicesSchema,
    },
    async (request, reply) => {
      const { model, invoiceNumber } = request.query

      const result = await fetchAllDevicesUseCase.execute({ model, invoiceNumber })

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { devices } = result.value

      return reply.status(200).send({ devices: devices.map(DevicePresenter.toHttp) })
    },
  )
}
