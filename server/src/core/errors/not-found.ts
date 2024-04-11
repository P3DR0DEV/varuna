export interface NotFoundError {
  name: 'NotFoundError'
  message: string
}

export function NotFound(message = 'Not Found.'): NotFoundError {
  return {
    name: 'NotFoundError',
    message,
  }
}
