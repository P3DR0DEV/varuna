import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { PrinterPresenter, printerSchema } from "../../presenters/printer-presenter"
import { getPrinterByTagUseCase } from "./factories/make-get-printer-by-tag"
import { errors } from "../_errors"

export async function getPrinterByTag(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/tag/:tag', {
    schema: {
      tags: ['Printers'],
      summary: 'Get printer by tag',
      params: z.object({
        tag: z.string()
      }),
      response: {
        200: z.object({
          printer: printerSchema
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

    const result = await getPrinterByTagUseCase.execute({ tag })

    if (result.isFailure()) {
      const { name, message } = result.reason

      throw new errors[name](message)
    }

    const { printer } = result.value

    return reply
      .status(200)
      .send({ printer: PrinterPresenter.toHttp(printer) })
  })
}