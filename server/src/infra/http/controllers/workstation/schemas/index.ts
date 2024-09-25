import z from 'zod'

import { workstationSchema } from '@/infra/http/presenters/workstation-presenter'

export const createWorkstationSchema = {
  tags: ['Workstation'],
  summary: 'Create workstation',
  body: z.object({
    computerId: z.string().uuid('Invalid ID type, must be a UUID'),
    departmentId: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    201: z.object({ workstation: workstationSchema }),
    400: z.object({ name: z.string(), message: z.string() }),
    404: z.object({ name: z.string(), message: z.string() }),
  },
} as const

export const deleteWorkstationSchema = {
  tags: ['Workstation'],
  summary: 'Delete workstation',
  params: z.object({
    id: z.string().uuid(),
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

export const editWorkstationSchema = {
  tags: ['Workstation'],
  summary: 'Edit workstation',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    computerId: z.string().uuid('Invalid ID type, must be a UUID'),
    departmentId: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    201: z.object({ workstation: workstationSchema }),
    400: z.object({ name: z.string(), message: z.string() }),
    404: z.object({ name: z.string(), message: z.string() }),
  },
} as const

export const fetchAllWorkstationsSchema = {
  tags: ['Workstation'],
  summary: 'Fetch all workstations',
  response: {
    200: z.object({ workstations: z.array(workstationSchema) }),
  },
} as const

export const getWorkstationByIdSchema = {
  tags: ['Workstation'],
  summary: 'Get workstation by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      workstation: workstationSchema,
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

export const getWorkstationByComputerSchema = {
  tags: ['Workstation'],
  summary: 'Get workstation by computer ',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      workstation: workstationSchema,
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
