import { FastifyInstance } from 'fastify'

import { createLicense } from './create-license'
import { fetchAllLicenses } from './fetch-all-licenses'
import { getLicenseById } from './get-license-by-id'
import { getLicenseByName } from './get-license-by-name'

export async function licensesRoutes(app: FastifyInstance) {
  /** POST /licenses */
  createLicense(app)

  /** GET /licenses?enterpriseName= */
  fetchAllLicenses(app)

  /** GET /licenses/:id */
  getLicenseById(app)

  /** GET /licenses/name/:name */
  getLicenseByName(app)

  /** PUT /licenses/:id */
}
