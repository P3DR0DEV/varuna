import fastifyCors from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
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
import { workstationRoutes } from './controllers/workstation'
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

// Register multipart plugin to handle file uploads
app.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB
  },
})

app.get('/', async () => {
  return {
    name: 'IT Manager API',
    version: '1.0.0',
    description: 'IT Manager API',
    status: 'OK',
  }
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
app.register(workstationRoutes, { prefix: '/workstations' })

app.setErrorHandler(errorHandler)

export { app }
