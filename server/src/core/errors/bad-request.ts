export interface BadRequestError {
  name: 'BadRequestError'
  message: string
}

export function BadRequest(message = 'Bad Request'): BadRequestError {
  return {
    name: 'BadRequestError',
    message,
  }
}
