import z from 'zod'

import { licenseSchema } from '@/infra/http/presenters/license-presenter'

export const createLicenseSchema = {
  tags: ['License'],
  summary: 'Create License',
  body: z.object({
    name: z.string(),
    quantity: z.coerce.number(),
    enterpriseName: z.string(),
    price: z.coerce.number(),
    status: z.enum(['active', 'inactive']).nullish(),
    userLicenseId: z.string().nullish(),
  }),
  response: {
    201: z.object({
      license: licenseSchema,
    }),
    400: z.object({
      name: z.string(),
      message: z.string(),
    }),
  },
} as const

export const editLicenseSchema = {
  tags: ['License'],
  summary: 'Edit license',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    name: z.string(),
    quantity: z.coerce.number(),
    expiresAt: z.coerce.date().nullable(),
    enterpriseName: z.string(),
    price: z.coerce.number(),
    status: z.enum(['active', 'inactive']).nullish(),
    userLicenseId: z.string().nullable(),
  }),
} as const

export const fetchAllLicensesSchema = {
  tags: ['License'],
  summary: 'Fetch All Licenses',
  querystring: z.object({
    enterpriseName: z.string().optional(),
  }),
  response: {
    200: z.object({
      licenses: z.array(licenseSchema),
    }),
  },
} as const

export const getLicenseByIdSchema = {
  tags: ['License'],
  summary: 'Get License By Id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      license: licenseSchema,
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

export const getLicenseByNameSchema = {
  tags: ['License'],
  summary: 'Get License By name',
  params: z.object({
    name: z.string(),
  }),
  response: {
    200: z.object({
      license: licenseSchema,
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
