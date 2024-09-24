import z from 'zod'

import { departmentSchema } from '@/infra/http/presenters/department-presenter'

export const addChiefToDepartmentSchema = {
  tags: ['Department'],
  summary: 'Add chief to department',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    userId: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      department: departmentSchema,
    }),
  },
} as const

export const createDepartmentSchema = {
  tags: ['Department'],
  summary: 'Create a new department',
  body: z.object({
    name: z.string(),
    description: z.string(),
    email: z.string().email().nullish(),
  }),
  response: {
    201: z.object({ department: departmentSchema }),
  },
} as const

export const deleteDepartmentSchema = {
  tags: ['Department'],
  summary: 'Delete a department',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editDepartmentSchema = {
  tags: ['Department'],
  summary: 'Edit a department',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    name: z.string(),
    description: z.string(),
    slug: z.string(),
    email: z.string().email().nullish(),
    chiefId: z.string().uuid().nullish(),
  }),
  response: {
    200: z.object({
      department: departmentSchema,
    }),
  },
} as const

export const fetchAllDepartmentsSchema = {
  tags: ['Department'],
  summary: 'Fetch all departments',
  response: {
    200: z.object({
      departments: z.array(departmentSchema),
    }),
  },
} as const

export const getDepartmentByIdSchema = {
  tags: ['Department'],
  summary: 'Get department by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      department: departmentSchema,
    }),
  },
} as const

export const getDepartmentBySlugSchema = {
  tags: ['Department'],
  summary: 'Get department by slug',
  params: z.object({
    slug: z.string(),
  }),
  response: {
    200: z.object({
      department: departmentSchema,
    }),
  },
} as const
