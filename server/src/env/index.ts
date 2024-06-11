import { z } from 'zod'

import { InternalServerError } from '@/core/errors/internal-server-error'

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables:', _env.error.format())
  throw InternalServerError('Invalid environment variables')
}

export const env = _env.data
