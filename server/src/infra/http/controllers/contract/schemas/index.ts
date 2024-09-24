import z from 'zod'

import { contractSchema } from '@/infra/http/presenters/contract-presenter'

const MAX_FILE_SIZE = 2 * 1024 * 1024

export const createContractSchema = {
  tags: ['Contract'],
  summary: 'Create a new contract',
  consumes: ['multipart/form-data'],
  body: z
    .object({
      description: z.object({ value: z.string() }),
      status: z.object({ value: z.enum(['active', 'inactive']).nullish() }),
      endsAt: z.object({ value: z.coerce.date() }),
      type: z.object({ value: z.enum(['renting', 'borrowing']) }),
      userEmail: z.object({ value: z.string().email() }),
      file: z.any(),
    })
    .refine(
      (data) => {
        if (!data.file) return false

        return true
      },
      { message: 'File is required' },
    )
    .refine(
      (data) => {
        if (!data.file) return false

        if (data.file.size > MAX_FILE_SIZE) {
          return false
        }

        return true
      },
      {
        message: 'File must be less than 2MB',
      },
    )
    .refine(
      (data) => {
        if (!data.file) return false

        const filename = data.file.filename

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

  response: {
    201: z.object({
      contract: contractSchema,
    }),
  },
} as const

export const editContractSchema = {
  tags: ['Contract'],
  summary: 'Edit contract',
  consumes: ['multipart/form-data'],
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z
    .object({
      description: z.object({ value: z.string() }),
      status: z.object({ value: z.enum(['active', 'inactive']) }),
      endsAt: z.object({ value: z.coerce.date() }),
      type: z.object({ value: z.enum(['renting', 'borrowing']) }),
      userEmail: z.object({ value: z.string().email() }),
      file: z.any(),
    })

    .refine(
      (data) => {
        if (!data.file) return true

        if (data.file.size > MAX_FILE_SIZE) {
          return false
        }

        return true
      },
      {
        message: 'File must be less than 2MB',
      },
    )
    .refine(
      (data) => {
        if (!data.file) return true

        const filename = data.file.filename

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

  response: {
    200: z.object({
      contract: contractSchema,
    }),
    400: z.object({
      name: z.string(),
      message: z.string(),
    }),
    404: z.object({
      name: z.string(),
      message: z.string(),
    }),
  },
} as const

export const editContractStatusSchema = {
  tags: ['Contract'],
  summary: 'Edit contract status',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    status: z.enum(['active', 'inactive']),
  }),
} as const

export const fetchAllContractsSchema = {
  tags: ['Contract'],
  summary: 'Fetch all contracts',
  querystring: z.object({
    userEmail: z.string().email().optional(),
    type: z.enum(['renting', 'borrowing']).optional(),
  }),
  response: {
    200: z.object({
      contracts: z.array(contractSchema),
    }),
  },
} as const

export const getContractByIdSchema = {
  tags: ['Contract'],
  summary: 'Get contract by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({ contract: contractSchema }),
    404: z.object({
      name: z.string(),
      message: z.string(),
    }),
    400: z.object({
      name: z.string(),
      message: z.string(),
    }),
  },
} as const
