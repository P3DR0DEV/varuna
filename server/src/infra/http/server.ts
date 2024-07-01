import {fastify} from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'
import { env } from '@/env'

const app = fastify({ logger: { level: env.LOG_LEVEL } })

// ! Fastify TypeProviderZod config to type routes inputs and outputs
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// ! Fastify Swagger config
app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'food-ordering',
      description: 'food-ordering API documentation',
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


app.listen({ port: env.PORT }, () => {
  console.log(`[server] HTTP listening on port ${env.PORT}`)
})