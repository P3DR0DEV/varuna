import { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRequestError } from './controllers/_errors/bad-request'
import { InternalServerError } from './controllers/_errors/internal-server-error'
import { NotFoundError } from './controllers/_errors/not-found'
import { UnauthorizedError } from './controllers/_errors/unauthorized'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      name: error.name,
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof UnauthorizedError) {
    return reply.status(401).send({
      name: error.name,
      message: error.message,
    })
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({
      name: error.name,
      message: error.message,
    })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({
      name: error.name,
      message: error.message,
    })
  }

  if (error instanceof InternalServerError) {
    return reply.status(500).send({
      name: error.name,
      message: error.message,
    })
  }

  return reply.status(500).send({
    name: error.name,
    message: error.message,
  })
}
