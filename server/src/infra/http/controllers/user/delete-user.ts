import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { deleteUserUseCase } from "./factories/make-delete-user";
import { errors } from "../_errors";

export async function deleteUser(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().delete('/:id',{
    schema: {
      params: z.object({
        id: z.string().uuid()
      })
    }
  }, async (request, reply) => {
    const { id } = request.params

    const result = await deleteUserUseCase.execute({
      id
    })

    if(result.isFailure()){
      const {name, message} = result.reason

      throw new errors[name](message)
    }

    const {message} = result.value
    
    return reply.status(200).send({
      message
    })
  })
}