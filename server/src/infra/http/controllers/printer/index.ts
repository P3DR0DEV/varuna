import { FastifyInstance } from 'fastify'

import { createPrinter } from './create-printer'
import { deletePrinter } from './delete-printer'
import { editPrinter } from './edit-printer'
import { fetchAllPrinters } from './fetch-all-printers'
import { getPrinterById } from './get-printer-by-id'
import { getPrinterByIP } from './get-printer-by-ip'
import { getPrinterByName } from './get-printer-by-name'
import { getPrinterBySerialNumber } from './get-printer-by-serial-number'
import { getPrinterByTag } from './get-printer-by-tag'

export async function printerRoutes(app: FastifyInstance) {
  /** POST /printers */
  createPrinter(app)

  /** GET /printers?type=[laser|inkjet|thermal|dotmatrix]?option=[colorful|monochrome] */
  fetchAllPrinters(app)

  /** GET /printers/:id */
  getPrinterById(app)

  /** GET /printers/ip/:ip */
  getPrinterByIP(app)

  /** GET /printers/name/:name */
  getPrinterByName(app)

  /** GET /printers/serial-number/:serialNumber */
  getPrinterBySerialNumber(app)

  /** GET /printers/tag/:tag */
  getPrinterByTag(app)

  /** PUT /printers/:id */
  editPrinter(app)

  /** DELETE /printers/:id */
  deletePrinter(app)
}
