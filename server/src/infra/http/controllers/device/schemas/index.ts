import z from 'zod'

import { devicesSchema } from '@/infra/http/presenters/device-presenter'

export const createDeviceSchema = {
  tags: ['Devices'],
  summary: 'Create a new device',
  body: z.object({
    serialNumber: z.string(),
    model: z.string(),
    acquisitionDate: z.coerce.date(),
    invoiceNumber: z.string().nullish(),
    tag: z.string().nullish(),
  }),
  response: {
    201: z.object({ device: devicesSchema }),
  },
} as const

export const deleteDeviceSchema = {
  tags: ['Devices'],
  summary: 'Delete a device',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editDeviceSchema = {
  tags: ['Devices'],
  summary: 'Edit a device',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    serialNumber: z.string(),
    model: z.string(),
    acquisitionDate: z.coerce.date(),
    tag: z.string().nullish(),
    invoiceNumber: z.string().nullish(),
    contractId: z.string().nullish(),
    endWarrantyDate: z.coerce.date().nullish(),
  }),
  response: {
    200: z.object({
      device: devicesSchema,
    }),
  },
} as const

export const fetchAllDevicesSchema = {
  tags: ['Devices'],
  summary: 'Fetch all devices',
  querystring: z.object({
    model: z.string().optional(),
    invoiceNumber: z.string().optional(),
  }),
  response: {
    200: z.object({
      devices: z.array(devicesSchema),
    }),
  },
} as const

export const getDeviceByIdSchema = {
  tags: ['Devices'],
  summary: 'Get a device by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      device: devicesSchema,
    }),
  },
} as const

export const getDeviceBySerialNumberSchema = {
  tags: ['Devices'],
  summary: 'Get a device by serial number',
  params: z.object({
    serialNumber: z.string(),
  }),
  response: {
    200: z.object({
      device: devicesSchema,
    }),
  },
} as const

export const getDeviceByTagSchema = {
  tags: ['Devices'],
  summary: 'Get device by tag',
  params: z.object({
    tag: z.string(),
  }),
  response: {
    200: z.object({
      device: devicesSchema,
    }),
  },
} as const
