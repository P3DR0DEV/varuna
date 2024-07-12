import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { DevicePresenter, devicesSchema } from "../../presenters/device-presenter";
import { getDeviceByTagUseCase } from "./factories/make-get-device-by-tag";
import { errors } from "../_errors";

export async function getDeviceByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get("/tag/:tag",{
    schema: {
      tags: ["Devices"],
      summary: "Get device by tag",
      params: z.object({
        tag: z.string()
      }),
      response: {
        200: z.object({
          device: devicesSchema
        }),
        400: z.object({
          name: z.string(),
          message: z.string(),
        }),
        404: z.object({
          name: z.string(),
          message: z.string(),
        })
      }
    }
  }, async (request, reply) => {
    const { tag } = request.params

    const result = await getDeviceByTagUseCase.execute({ tag })

    if (result.isFailure()) {
      const { name, message } = result.reason

      throw new errors[name](message)
    }

    const { device } = result.value

    return reply.status(200).send({ device: DevicePresenter.toHttp(device) })
  })
}