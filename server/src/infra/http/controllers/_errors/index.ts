import { BadRequestError } from './bad-request'
import { InternalServerError } from './internal-server-error'
import { NotFoundError } from './not-found'
import { UnauthorizedError } from './unauthorized'

export const errors = {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  InternalServerError,
  Error,
} as const
