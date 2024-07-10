import { FastifyInstance } from "fastify";
import { createService } from "./create-service";

export async function serviceRoutes(app:FastifyInstance) {
  /** POST /services */
  createService(app)

  /** GET /services */

  /** GET /services/:id */

  /** PUT /services/:id */

  /** DELETE /services/:id */

  /** GET /services/ip/:ip */
}