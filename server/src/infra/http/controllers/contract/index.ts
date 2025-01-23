import type { FastifyInstance } from 'fastify'

import { createContract } from './create-contract'
import { editContract } from './edit-contract'
import { editContractStatus } from './edit-contract-status'
import { fetchAllContracts } from './fetch-all-contracts'
import { getContractById } from './get-contract-by-id'

export async function contractRoutes(app: FastifyInstance) {
  /** POST /contracts/ */
  createContract(app)

  /**
   *  type = 'renting' | 'borrowing'
   *  GET /contracts/?type=''
   *
   *  GET /contracts/?userEmail=''
   */
  fetchAllContracts(app)

  /** GET /contracts/:id */
  getContractById(app)

  /** PUT /contracts/:id */
  editContract(app)

  /** PATCH /contracts/:id/status */
  editContractStatus(app)
}
