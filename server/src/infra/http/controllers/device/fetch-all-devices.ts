import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { DevicePresenter, devicesSchema } from "../../presenters/device-presenter";
import { fetchAllDevicesUseCase } from "./factories/make-fetch-all-devices";
import { errors } from "../_errors";

export async function fetchAllDevices(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/', {
    schema: {
      tags: ['Devices'],
      summary: 'Fetch all devices',
      querystring: z.object({
        model: z.string().optional(),
        invoiceNumber: z.string().optional()
      }),
      response: {
        200: z.object({
          devices: z.array(devicesSchema)
        })
      }
    }
  }, async (request, reply) => {
    const { model, invoiceNumber } = request.query

    const result = await fetchAllDevicesUseCase.execute({ model, invoiceNumber })

    if (result.isFailure()) {
      throw new errors.InternalServerError('Unexpected error')
    }

    const { devices } = result.value

    return reply.status(200).send({ devices: devices.map(DevicePresenter.toHttp) })
  })
}