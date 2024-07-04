import { FastifyInstance } from 'fastify'

import { addChiefToDepartment } from './add-chief-to-department'
import { createDepartment } from './create-department'
import { deleteDepartment } from './delete-department'
import { editDepartment } from './edit-department'
import { fetchAllDepartments } from './fetch-all-departments'
import { getDepartmentById } from './get-department-by-id'
import { getDepartmentBySlug } from './get-department-by-slug'

export async function departmentRoutes(app: FastifyInstance) {
  /** POST /departments/ */
  createDepartment(app)

  /** GET /departments/ */
  fetchAllDepartments(app)

  /** GET /departments/id/:id */
  getDepartmentById(app)

  /** GET /departments/:slug */
  getDepartmentBySlug(app)

  /** DELETE /departments/:id */
  deleteDepartment(app)

  /** PUT /departments/:id */
  editDepartment(app)

  /** PATCH /departments/:id/chief */
  addChiefToDepartment(app)
}
