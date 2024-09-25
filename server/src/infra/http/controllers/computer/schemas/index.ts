import z from 'zod'

import { computersSchema } from '@/infra/http/presenters/computer-presenter'

export const createComputerSchema = {
  summary: 'Create a new computer',
  tags: ['Computers'],
  body: z.object({
    acquisitionDate: z.coerce.date(),
    description: z.string(),
    hostname: z.string(),
    ipAddress: z.string().ip({ version: 'v4' }),
    model: z.string(),
    operatingSystem: z.string(),
    serialNumber: z.string(),
    type: z.enum(['server', 'notebook', 'desktop']),
    tag: z.string().nullish(),
    contractId: z.string().uuid().nullish(),
    endWarrantyDate: z.coerce.date().nullish(),
    invoiceNumber: z.string(),
  }),

  response: {
    201: z.object({
      computer: computersSchema,
    }),
  },
} as const

export const deleteComputerSchema = {
  summary: 'Delete a computer',
  tags: ['Computers'],
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editComputerSchema = {
  summary: 'Edit computer',
  tags: ['Computers'],
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    acquisitionDate: z.coerce.date(),
    description: z.string(),
    hostname: z.string(),
    ipAddress: z.string(),
    model: z.string(),
    operatingSystem: z.string(),
    serialNumber: z.string(),
    type: z.enum(['server', 'notebook', 'desktop']),
    tag: z.string().nullish(),
    contractId: z.string().uuid().nullish(),
    endWarrantyDate: z.coerce.date().nullish(),
    invoiceNumber: z.string().nullish(),
  }),
  response: {
    200: z.object({
      computer: computersSchema,
    }),
  },
} as const

export const fetchAllComputersSchema = {
  summary: 'Fetch all computers',
  tags: ['Computers'],
  querystring: z.object({
    operatingSystem: z.string().nullish(),
  }),
  response: {
    200: z.object({
      computers: z.array(computersSchema),
    }),
  },
} as const

export const getComputerByHostnameSchema = {
  summary: 'Get a computer by hostname',
  tags: ['Computers'],
  params: z.object({
    hostname: z.string(),
  }),
  response: {
    200: z.object({
      computer: computersSchema,
    }),
  },
} as const

export const getComputerByIdSchema = {
  summary: 'Get a computer by id',
  tags: ['Computers'],
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      computer: computersSchema,
    }),
  },
} as const

export const getComputerByIpAddressSchema = {
  summary: 'Get a computer by ip address',
  tags: ['Computers'],
  params: z.object({
    ipAddress: z.string().ip({ version: 'v4' }),
  }),
  response: {
    200: z.object({
      computer: computersSchema,
    }),
  },
} as const

export const getComputerByTagSchema = {
  tags: ['Computers'],
  summary: 'Get computer by tag',
  params: z.object({
    tag: z.string(),
  }),
  response: {
    200: z.object({
      computer: computersSchema,
    }),
  },
} as const
