import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import z from "zod";
import { ComputerPresenter, computersSchema } from "../../presenters/computer-presenter";
import { getComputerByTagUseCase } from "./factories/make-get-computer-by-tag";
import { errors } from "../_errors";

export async function getComputerByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/tag/:tag', {
    schema: {
      tags: ['Computers'],
      summary: 'Get computer by tag',
      params: z.object({
        tag: z.string()
      }),
      response: {
        200: z.object({
          computer: computersSchema
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
      const { tag } = request.params

      const result =  await getComputerByTagUseCase.execute({ tag })

      if (result.isFailure()) {
        const {name, message} = result.reason

        throw new errors[name](message)
      }

      const { computer } = result.value

      return reply.status(200).send({
        computer: ComputerPresenter.toHttp(computer)
      })
    }
  )
}