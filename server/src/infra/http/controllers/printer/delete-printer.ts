import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { deletePrinterUseCase } from "./factories/make-delete-printer";
import { errors } from "../_errors";

export async function deletePrinter(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete('/:id', {
    schema: {
      tags: ['Printers'],
      summary: 'Delete a printer',
      params: z.object({
        id: z.string()
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

    const result = await deletePrinterUseCase.execute({ id })

    if (result.isFailure()) {
      const { name, message } = result.reason

      throw new errors[name](message)
    } 

    const { message } = result.value

    return reply.status(200).send({ message })
  })
}