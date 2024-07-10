import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { createServiceUseCase } from "./factories/make-create-service";
import { errors } from "../_errors";
import { ServicePresenter, serviceSchema } from "../../presenters/service-presenter";

export async function createService(app:FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post('/', {
    schema: {
      tags: ['Services'],
      summary: 'Create a new service',
      body: z.object({
        name: z.string(),
        description: z.string(),
        ipAddress: z.string().ip({ version: 'v4' }),
        port: z.coerce.number(),
        type: z.enum(['application', 'database', 'infra'])
      }),
      response: {
        201: z.object({
          service: serviceSchema
        }),
        404: z.object({
          name: z.string(),
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const props = request.body

    const result = await createServiceUseCase.execute(props)

    if(result.isFailure()){
      const { name, message } = result.reason

      throw new errors[name](message)
    }

    const { service } = result.value

    return reply.status(201).send({
      service: ServicePresenter.toHttp(service)
    })
  })
}