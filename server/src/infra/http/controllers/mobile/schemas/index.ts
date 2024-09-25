import z from 'zod'

import { mobileSchema } from '@/infra/http/presenters/mobile-presenter'

export const createMobileSchema = {
  tags: ['Mobiles'],
  summary: 'Create a new mobile',
  body: z.object({
    name: z.string(),
    type: z.enum(['tablet', 'cellphone']),
    acquisitionDate: z.coerce.date(),
    serialNumber: z.string(),
    model: z.string(),
    operatingSystem: z.string(),
    tag: z.string().nullish(),
    departmentId: z.string().nullish(),
    numberProvider: z.string().nullish(),
    endWarrantyDate: z.coerce.date().nullish(),
    number: z.string().nullish(),
    invoiceNumber: z.string().nullish(),
    contractId: z.string().nullish(),
  }),
  response: {
    201: z.object({
      mobile: mobileSchema,
    }),
  },
} as const

export const deleteMobileSchema = {
  tags: ['Mobiles'],
  summary: 'Delete a mobile',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editMobileSchema = {
  tags: ['Mobiles'],
  summary: 'Edit mobile',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    name: z.string(),
    type: z.enum(['tablet', 'cellphone']),
    acquisitionDate: z.coerce.date(),
    serialNumber: z.string(),
    model: z.string(),
    operatingSystem: z.string(),
    tag: z.string().nullish(),
    number: z.string().nullish(),
    endWarrantyDate: z.coerce.date().nullish(),
    invoiceNumber: z.string().nullish(),
    numberProvider: z.string().nullish(),
    departmentId: z.string().nullish(),
    contractId: z.string().nullish(),
  }),
  response: {
    200: z.object({
      mobile: mobileSchema,
    }),
  },
} as const

export const fetchAllMobilesSchema = {
  tags: ['Mobiles'],
  summary: 'Fetch all mobiles',
  querystring: z.object({
    type: z.enum(['cellphone', 'tablet']).nullish(),
  }),
  response: {
    200: z.object({ mobiles: z.array(mobileSchema) }),
  },
} as const

export const getMobileByIdSchema = {
  tags: ['Mobiles'],
  summary: 'Get a mobile by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      mobile: mobileSchema,
    }),
  },
} as const

export const fetchMobilesByDepartmentSchema = {
  tags: ['Mobiles'],
  summary: 'Fetch mobiles by department',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      mobiles: z.array(mobileSchema),
    }),
  },
} as const

export const getMobileByNameSchema = {
  tags: ['Mobiles'],
  summary: 'Get mobile by name',
  params: z.object({
    name: z.string(),
  }),
  response: {
    200: z.object({
      mobile: mobileSchema,
    }),
  },
} as const

export const getMobileByTagSchema = {
  tags: ['Mobiles'],
  summary: 'Get mobile by tag',
  params: z.object({
    tag: z.string(),
  }),
  response: {
    200: z.object({
      mobile: mobileSchema,
    }),
  },
} as const
