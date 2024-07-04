import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { env } from '@/env'

import { computerRoutes } from './controllers/computer'
import { departmentRoutes } from './controllers/department'
import { userRoutes } from './controllers/user'
import { errorHandler } from './error-handler'

const app = fastify({ logger: { level: env.LOG_LEVEL } })

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'IT Manager API',
      description: 'IT Manager API',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyCors, {
  origin: '*',
})

app.register(computerRoutes, { prefix: '/computers' })
app.register(userRoutes, { prefix: '/users' })
app.register(departmentRoutes, { prefix: '/departments' })

app.setErrorHandler(errorHandler)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`[server] HTTP server listening on port ${env.PORT}`)
})
