import { FastifyInstance } from 'fastify'

import { createService } from './create-service'
import { deleteService } from './delete-service'
import { editService } from './edit-service'
import { fetchAllServices } from './fetch-all-services'
import { fetchServicesByIpAddress } from './fetch-services-by-ip-address'
import { getServiceById } from './get-service-by-id'

export async function serviceRoutes(app: FastifyInstance) {
  /** POST /services */
  createService(app)

  /** GET /services?type=[application|database|infra] */
  fetchAllServices(app)

  /** GET /services/:id */
  getServiceById(app)

  /** PUT /services/:id */
  editService(app)

  /** DELETE /services/:id */
  deleteService(app)

  /** GET /services/ip/:ip */
  fetchServicesByIpAddress(app)
}
