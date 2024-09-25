import z from 'zod'

import { userLicenseSchema } from '@/infra/http/presenters/user-license-presenter'

export const createUserLicenseRelationSchema = {
  tags: ['User License'],
  summary: 'Create user license relation',
  body: z.object({
    userId: z.string().uuid('Invalid ID type, must be a UUID'),
    licenseId: z.string().uuid('Invalid ID type, must be a UUID'),
    departmentId: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    201: z.object({
      relation: userLicenseSchema,
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

export const deleteUserLicenseRelationSchema = {
  tags: ['User License'],
  summary: 'Delete relation',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
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

export const fetchUserLicenseRelationsByLicenseSchema = {
  tags: ['User License'],
  summary: 'Get relation by license id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      relation: userLicenseSchema,
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

export const getUserLicenseRelationByIdSchema = {
  tags: ['User License'],
  summary: 'Get relation by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      relation: userLicenseSchema,
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

export const fetchUserLicenseRelationByUserSchema = {
  tags: ['User License'],
  summary: 'Fetch relation by user',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      relations: z.array(userLicenseSchema),
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
