import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { generateFileName } from '@/infra/util/generate-file-name'

import { ContractPresenter, contractSchema } from '../../presenters/contract-presenter'
import { errors } from '../_errors'
import { createContractUseCase } from './factories/make-create-contract'

const MAX_FILE_SIZE = 5 * 1024 * 1024

export async function createContract(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
    {
      schema: {
        tags: ['Contract'],
        summary: 'Create a new contract',
        body: z.object({
          name: z.string(),
          description: z.string(),
          value: z.number(),
          startDate: z.string(),
          endDate: z.string(),
          type: z.enum(['renting', 'borrowing']),
          userEmail: z.string().email(),
          file: z
            .any()
            .refine(
              (file) => {
                if (!file) return false
                return true
              },
              { message: 'File is required' },
            )
            .refine(
              (file) => {
                if (!file) return false

                if (file.size > MAX_FILE_SIZE) {
                  return false
                }

                return true
              },
              {
                message: 'File must be less than 5MB',
              },
            )
            .refine(
              (file) => {
                if (!file) return false

                const filename = file.filename

                const fileExtension = filename.split('.').pop()

                if (fileExtension !== 'pdf') {
                  return false
                }

                return true
              },
              {
                message: 'Invalid file type',
              },
            ),
        }),
        response: {
          201: z.object({
            contract: contractSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const { file, ...props } = request.body

      const fileName = generateFileName(file)

      const result = await createContractUseCase.execute({ fileName, ...props })

      // upload image to server

      if (result.isFailure()) {
        throw new errors.InternalServerError('Unexpected error')
      }

      const { contract } = result.value

      return reply.status(201).send({
        contract: ContractPresenter.toHttp(contract),
      })
    },
  )
}
