export interface InternalServerError {
  name: 'Internal Server Error'
  message: string
}

export function InternalServerError(message = 'InternalServerError'): InternalServerError {
  return {
    name: 'Internal Server Error',
    message,
  }
}
