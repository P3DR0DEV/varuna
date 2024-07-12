import { FastifyInstance } from "fastify"
import { ZodTypeProvider } from "fastify-type-provider-zod"
import z from "zod"
import { PrinterPresenter, printerSchema } from "../../presenters/printer-presenter"
import { getPrinterBySerialNumberUseCase } from "./factories/make-get-printer-by-serial-number"
import { errors } from "../_errors"

export async function getPrinterBySerialNumber(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get('/serial-number/:serialNumber', {
    schema: {
      tags: ['Printers'],
      summary: 'Get printer by serialNumber',
      params: z.object({
        serialNumber: z.string()
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
    const { serialNumber } = request.params

    const result = await getPrinterBySerialNumberUseCase.execute({ serialNumber })

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