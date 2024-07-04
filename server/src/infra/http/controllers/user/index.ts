import { FastifyInstance } from 'fastify'

import { createUser } from './create-user'
import { deleteUser } from './delete-user'
import { editUser } from './edit-user'
import { fetchAllUsers } from './fetch-all-users'
import { fetchAllUsersByDepartment } from './fetch-all-users-by-department'
import { getUserByBadge } from './get-user-by-badge'
import { getUserByEmail } from './get-user-by-email'
import { getUserById } from './get-user-by-id'

export async function userRoutes(app: FastifyInstance) {
  /* POST /users/  */
  createUser(app)

  /* PUT /users/:id/  */
  editUser(app)

  /* GET /users/  */
  fetchAllUsers(app)

  /* GET /users/department/:departmentId/  */
  fetchAllUsersByDepartment(app)

  /* GET /users/:id/  */
  getUserById(app)

  /* GET /users/badge/:badge/  */
  getUserByBadge(app)

  /* GET /users/email/:email/  */
  getUserByEmail(app)

  /* DELETE /users/:id/  */
  deleteUser(app)
}
