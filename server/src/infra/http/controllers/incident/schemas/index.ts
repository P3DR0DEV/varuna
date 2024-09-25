import z from 'zod'

import { incidentsSchema } from '@/infra/http/presenters/incident-presenter'

export const createIncidentSchema = {
  tags: ['Incidents'],
  summary: 'Create a new incident',
  body: z.object({
    description: z.string(),
    workstationId: z.string().uuid('Invalid ID type, must be a UUID'),
    deviceId: z.string().uuid('Invalid ID type, must be a UUID').nullish(),
  }),
  response: {
    201: z.object({ incident: incidentsSchema }),
  },
} as const

export const deleteIncidentSchema = {
  tags: ['Incidents'],
  summary: 'Delete an incident',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editIncidentSchema = {
  tags: ['Incidents'],
  summary: 'Edit an incident',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    description: z.string(),
    workstationId: z.string().uuid(),
    deviceId: z.string().uuid().nullable(),
    fixedAt: z.coerce.date().nullable(),
  }),
  response: {
    200: z.object({
      incident: incidentsSchema,
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

export const fetchIncidentsByDeviceSchema = {
  tags: ['Incidents'],
  summary: 'Fetch incidents by device',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      incidents: z.array(incidentsSchema),
    }),
  },
} as const

export const fetchIncidentsByWorkstationSchema = {
  tags: ['Incidents'],
  summary: 'Fetch incidents by workstation id',
  params: z.object({
    id: z.string().uuid(),
  }),
  response: {
    200: z.object({
      incidents: z.array(incidentsSchema),
    }),
  },
} as const

export const getIncidentByIdSchema = {
  tags: ['Incidents'],
  summary: 'Get an incident by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      incident: incidentsSchema,
    }),
  },
} as const

export const updateIncidentStatusToFixedSchema = {
  tags: ['Incidents'],
  summary: 'Set incident as fixed',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const
