import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { devicesSchema } from "../../presenters/device-presenter";
import { editDeviceUseCase } from "./factories/make-edit-device";

export async function editDevice(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    '/:id',
    {
      schema: {
        tags: ['Devices'],
        summary: 'Edit a device',
        params: z.object({
          id: z.string().uuid(),
        }),
        body: z.object({
          serialNumber: z.string(),
          model: z.string(),
          acquisitionDate: z.coerce.date(),
          invoiceNumber: z.string().nullish(),
          contractId: z.string().nullish(),
          endWarrantyDate: z.coerce.date().nullish(),
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
        }
      }
    },
    async (request, reply) => {
      const { id } = request.params

      const props = request.body

      const result = await editDeviceUseCase.execute({ id, ...props })
    }
  )
}