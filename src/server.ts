import Fastify from 'fastify'
import cors from '@fastify/cors'
import fastifyEnv from '@fastify/env'
import { aiRoutes } from './routes/ai'

const schema = {
  type: 'object',
  required: [
    'FASTIFY_PORT',
    'GOOGLE_PROJECT_ID',
    'GOOGLE_API_ENDPOINT',
    'GOOGLE_APP_KEY',
    'GOOGLE_MODEL',
    'GOOGLE_LOCATION'
  ],
  properties: {
    FASTIFY_PORT: {
      type: 'string'
    },
    GOOGLE_PROJECT_ID: {
      type: 'string'
    },
    GOOGLE_APP_KEY: {
      type: 'string'
    },
    GOOGLE_API_ENDPOINT: {
      type: 'string'
    },
    GOOGLE_MODEL: {
      type: 'string'
    },
    GOOGLE_LOCATION: {
      type: 'string'
    }
  }
}

const options = {
  confKey: 'config',
  schema,
  dotenv: true,
  data: process.env
}

async function bootstrap() {
  const fastify = Fastify({
    logger: true
  })

  await fastify.register(fastifyEnv, options)
  await fastify.after()

  await fastify.register(cors, {
    origin: true
  })

  fastify.get('/ping', async (_, reply) => {
    return reply.status(200).send({
      status: true,
      statusMessage: 'HTTP Server running!',
      message: 'pong'
    })
  })

  await fastify.register(aiRoutes)

  await fastify.listen({
    port: Number(process.env.FASTIFY_PORT) || 3333,
    host: '0.0.0.0'
  })
}

bootstrap()
