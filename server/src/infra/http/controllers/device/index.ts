import { FastifyInstance } from 'fastify'

import { createDevice } from './create-device'
import { deleteDevice } from './delete-device'
import { editDevice } from './edit-device'
import { fetchAllDevices } from './fetch-all-devices'
import { getDeviceById } from './get-device-by-id'
import { getDeviceBySerialNumber } from './get-device-by-serial-number'

export async function devicesRoutes(app: FastifyInstance) {
  /* POST /devices/ */
  createDevice(app)

  /* GET /devices?model=''?invoiceNumber='' */
  fetchAllDevices(app)

  /* GET /devices/:id */
  getDeviceById(app)

  /* GET /devices/serial-number/:serialNumber */
  getDeviceBySerialNumber(app)

  /* PUT /devices/:id */
  editDevice(app)

  /* DELETE /devices/:id */
  deleteDevice(app)
}
