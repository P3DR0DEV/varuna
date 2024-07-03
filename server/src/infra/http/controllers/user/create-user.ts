import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

export async function createUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          phone: z.string().nullish(),
          badge: z.string(),
          departmentId: z.string(),
          workstationId: z.string().nullish(),
        }),
      },
    },
    async (request, reply) => {
      const props = request.body
    },
  )
}
