import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod'

import { env } from '@/env'

import { computerRoutes } from './controllers/computer'
import { contractRoutes } from './controllers/contract'
import { departmentRoutes } from './controllers/department'
import { devicesRoutes } from './controllers/device'
import { incidentRoutes } from './controllers/incident'
import { licensesRoutes } from './controllers/license'
import { mobileRoutes } from './controllers/mobile'
import { printerRoutes } from './controllers/printer'
import { serviceRoutes } from './controllers/service'
import { userRoutes } from './controllers/user'
import { userLicenseRoutes } from './controllers/user-license'
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
app.register(contractRoutes, { prefix: '/contracts' })
app.register(devicesRoutes, { prefix: '/devices' })
app.register(incidentRoutes, { prefix: '/incidents' })
app.register(licensesRoutes, { prefix: '/licenses' })
app.register(mobileRoutes, { prefix: '/mobiles' })
app.register(serviceRoutes, { prefix: '/services' })
app.register(printerRoutes, { prefix: '/printers' })
app.register(userLicenseRoutes, { prefix: '/user-licenses' })

app.setErrorHandler(errorHandler)

app.listen({ port: env.PORT, host: '0.0.0.0' }).then(() => {
  console.log(`[server] HTTP server listening on port ${env.PORT}`)
})
