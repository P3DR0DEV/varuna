import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { deleteServiceUseCase } from "./factories/make-delete-service";
import { errors } from "../_errors";

export async function deleteService(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/:id', {
    schema: {
      tags: ['Services'],
      summary: 'Delete a service',
      params: z.object({
        id: z.string().uuid()
      }),
      response: {
        200: z.object({
          message: z.string()
        }),
        400: z.object({
          name: z.string(),
          message: z.string()
        }),
        404: z.object({
          name: z.string(),
          message: z.string()
        })
      }
    }
  }, async (request, reply) => {
    const { id } = request.params

    const result = await deleteServiceUseCase.execute({id})

    if (result.isFailure()) {
      const { name, message } = result.reason
      
      throw new errors[name](message)
    }

    const { message } = result.value

    return reply.status(200).send({
      message
    })
  })
}