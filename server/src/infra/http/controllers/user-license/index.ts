import { FastifyInstance } from 'fastify'

import { createRelation } from './create-relation'
import { deleteRelation } from './delete-relation'
import { fetchRelationByUser } from './fetch-relation-by-user'
import { getRelationById } from './get-relation-by-id'
import { getRelationByLicense } from './get-relation-by-license'

export async function userLicenseRoutes(app: FastifyInstance) {
  /** POST /user-license/ */
  createRelation(app)

  /** GET /user-license/:id  */
  getRelationById(app)

  /** GET /user-license/user/:id */
  fetchRelationByUser(app)

  /** GET /user-license/license/:id */
  getRelationByLicense(app)

  /** DELETE /user-license/ */
  deleteRelation(app)
}
