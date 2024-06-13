export interface InternalServerError {
  name: 'InternalServerError'
  message: string
}

export function InternalServerError(message = 'Internal Server Error'): InternalServerError {
  return {
    name: 'InternalServerError',
    message,
  }
}
