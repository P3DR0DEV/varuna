import z from 'zod'

import { serviceSchema } from '@/infra/http/presenters/service-presenter'

export const createServiceSchema = {
  tags: ['Services'],
  summary: 'Create a new service',
  body: z.object({
    name: z.string(),
    description: z.string(),
    ipAddress: z.string().ip({ version: 'v4' }),
    port: z.coerce.number(),
    type: z.enum(['application', 'database', 'infra']),
  }),
  response: {
    201: z.object({
      service: serviceSchema,
    }),
  },
} as const

export const deleteServiceSchema = {
  tags: ['Services'],
  summary: 'Delete a service',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editServiceSchema = {
  tags: ['Services'],
  summary: 'Edit a service',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    description: z.string(),
    ipAddress: z.string(),
    name: z.string(),
    port: z.coerce.number(),
    type: z.enum(['application', 'infra', 'database']),
  }),
  response: {
    200: z.object({
      service: serviceSchema,
    }),
  },
} as const

export const fetchAllServicesSchema = {
  tags: ['Services'],
  summary: 'Fetch all services',
  querystring: z.object({
    type: z.enum(['application', 'database', 'infra']).optional(),
  }),
  response: {
    200: z.object({
      services: z.array(serviceSchema),
    }),
  },
} as const

export const fetchServicesByIpAddressSchema = {
  tags: ['Services'],
  summary: 'Fetch services by IP address',
  params: z.object({
    ip: z.string().ip({ version: 'v4' }),
  }),
  response: {
    200: z.object({
      services: z.array(serviceSchema),
    }),
  },
} as const

export const getServiceByIdSchema = {
  tags: ['Services'],
  summary: 'Get service by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      service: serviceSchema,
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
