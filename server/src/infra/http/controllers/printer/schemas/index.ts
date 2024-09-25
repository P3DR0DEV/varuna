import z from 'zod'

import { printerSchema, printersToDashboardSchema } from '@/infra/http/presenters/printer-presenter'

export const createPrinterSchema = {
  tags: ['Printers'],
  summary: 'Create a new printer',
  body: z.object({
    name: z.string(),
    type: z.enum(['inkjet', 'laser', 'thermal', 'dotmatrix']),
    printing: z.enum(['colorful', 'monochrome']),
    serialNumber: z.string(),
    model: z.string(),
    tag: z.string().nullish(),
    acquisitionDate: z.coerce.date(),
    invoiceNumber: z.string().nullish(),
    endWarrantyDate: z.coerce.date().nullish(),
    observations: z.string().nullish(),
    ipAddress: z.string().ip({ version: 'v4' }).nullish(),
  }),
  response: {
    201: z.object({
      printer: printerSchema,
    }),
  },
} as const

export const deletePrinterSchema = {
  tags: ['Printers'],
  summary: 'Delete a printer',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      message: z.string(),
    }),
  },
} as const

export const editPrinterSchema = {
  tags: ['Printers'],
  summary: 'Edit Printer',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  body: z.object({
    name: z.string(),
    type: z.enum(['inkjet', 'laser', 'thermal', 'dotmatrix']),
    printing: z.enum(['colorful', 'monochrome']),
    tag: z.string().nullish(),
    ipAddress: z.string().ip({ version: 'v4' }).nullish(),
    observations: z.string().nullish(),
    serialNumber: z.string(),
    model: z.string(),
    endWarrantyDate: z.coerce.date().nullish(),
    invoiceNumber: z.string().nullish(),
    acquisitionDate: z.coerce.date(),
  }),
} as const

export const fetchAllPrintersSchema = {
  tags: ['Printers'],
  summary: 'Fetch All Printers',
  querystring: z.object({
    type: z.enum(['laser', 'inkjet', 'thermal', 'dotmatrix']).nullish(),
    option: z.enum(['colorful', 'monochrome']).nullish(),
  }),
  response: {
    200: z.object({
      printers: z.array(printersToDashboardSchema),
    }),
  },
} as const

export const getPrinterByIdSchema = {
  tags: ['Printers'],
  summary: 'Get printer by id',
  params: z.object({
    id: z.string().uuid('Invalid ID type, must be a UUID'),
  }),
  response: {
    200: z.object({
      printer: printerSchema,
    }),
  },
} as const

export const getPrinterByIpAddressSchema = {
  tags: ['Printers'],
  summary: 'Get printer by ip',
  params: z.object({
    ip: z.string().ip({ version: 'v4' }),
  }),
  response: {
    200: z.object({
      printer: printerSchema,
    }),
  },
} as const

export const getPrinterByNameSchema = {
  tags: ['Printers'],
  summary: 'Get printer by name',
  params: z.object({
    name: z.string(),
  }),
  response: {
    200: z.object({
      printer: printerSchema,
    }),
  },
} as const

export const getPrinterBySerialNumberSchema = {
  tags: ['Printers'],
  summary: 'Get printer by serialNumber',
  params: z.object({
    serialNumber: z.string(),
  }),
  response: {
    200: z.object({
      printer: printerSchema,
    }),
  },
} as const

export const getPrinterByTagSchema = {
  tags: ['Printers'],
  summary: 'Get printer by tag',
  params: z.object({
    tag: z.string(),
  }),
  response: {
    200: z.object({
      printer: printerSchema,
    }),
  },
} as const
