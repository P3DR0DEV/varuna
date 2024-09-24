import { FastifyInstance } from 'fastify'

import { createRelation } from './create-relation'
import { deleteRelation } from './delete-relation'
import { fetchRelationByUser } from './fetch-relation-by-user'
import { getRelationById } from './get-relation-by-id'
import { getRelationByLicense } from './get-relation-by-license'

export async function userLicenseRoutes(app: FastifyInstance) {
  /** POST /user-licenses/ */
  createRelation(app)

  /** GET /user-licenses/:id  */
  getRelationById(app)

  /** GET /user-licenses/user/:id */
  fetchRelationByUser(app)

  /** GET /user-licenses/license/:id */
  getRelationByLicense(app)

  /** DELETE /user-licenses/ */
  deleteRelation(app)
}
