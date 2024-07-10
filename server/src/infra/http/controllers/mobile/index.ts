import { FastifyInstance } from 'fastify'

import { createMobile } from './create-mobile'
import { deleteMobile } from './delete-mobile'
import { editMobile } from './edit-mobile'
import { fetchAllMobiles } from './fetch-all-mobiles'
import { fetchMobilesByDepartment } from './fetch-mobiles-by-department'
import { getMobileById } from './get-mobile-by-id'
import { getMobileByName } from './get-mobile-by-name'

export async function mobileRoutes(app: FastifyInstance) {
  /** POST /mobiles */
  createMobile(app)

  /** GET /mobiles?type=[tablet|cellphone] */
  fetchAllMobiles(app)

  /** GET /mobiles/department/:id */
  fetchMobilesByDepartment(app)

  /** GET /mobiles/:id */
  getMobileById(app)

  /** GET /mobiles/name/:name */
  getMobileByName(app)

  /** PUT /mobiles/:id */
  editMobile(app)

  /** DELETE /mobiles/:id */
  deleteMobile(app)
}
