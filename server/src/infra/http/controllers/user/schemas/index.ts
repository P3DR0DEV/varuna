import z from 'zod'

import { usersSchema } from '@/infra/http/presenters/user-presenter'

export const createUserSchema = {
  tags: ['Users'],
  summary: 'Create a new user',
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().optional(),
    badge: z.string(),
    departmentId: z.string().uuid('Invalid ID type, must be a UUID').nullish(),
    workstationId: z.string().uuid('Invalid ID type, must be a UUID').nullish(),
  }),

  response: {
    201: z.object({
      user: usersSchema,
    }),
  },
} as const

export const deleteUserSchema = {
  tags: ['Users'],
  summary: 'Delete a user',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editUserSchema = {
  summary: 'Edit a user',
  tags: ['Users'],
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().nullable(),
    badge: z.string(),
    departmentId: z.string().nullable(),
  }),

  response: {
    200: z.object({
      user: usersSchema,
    }),
  },
} as const

export const fetchAllUsersByDepartmentSchema = {
  summary: 'Fetch all users by department',
  tags: ['Users'],
  params: z.object({
    departmentId: z.string().uuid('Invalid ID type, must be a UUID'),
  }),

  response: {
    200: z.object({
      users: z.array(usersSchema),
    }),
  },
} as const

export const fetchAllUsersSchema = {
  summary: 'Fetch all users',
  tags: ['Users'],

  response: {
    200: z.object({
      users: z.array(usersSchema),
    }),
  },
} as const

export const getUserByBadgeSchema = {
  summary: 'Get user by badge',
  tags: ['Users'],
  params: z.object({
    badge: z.string(),
  }),

  response: {
    200: z.object({
      user: usersSchema,
    }),
  },
} as const

export const getUserByEmailSchema = {
  summary: 'Get user by email',
  tags: ['Users'],
  params: z.object({
    email: z.string().email(),
  }),

  response: {
    200: z.object({
      user: usersSchema,
    }),
  },
} as const

export const getUserByIdSchema = {
  summary: 'Get user by id',
  tags: ['Users'],
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),

  response: {
    200: z.object({
      user: usersSchema,
    }),
  },
} as const
