import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { aiPrompt } from '../modules/ai'

export async function aiRoutes(fastify: FastifyInstance) {
  fastify.post('/infoProduct', async request => {
    const createBody = z.object({
      product: z.string().min(2)
    })
    const { product } = createBody.parse(request.body)

    const response = await aiPrompt(
      `Forneça-me mais informações sobre o produto a seguir: ${product}`
    )

    return {
      product,
      response,
      aiParams: process.env.GOOGLE_LOCATION
    }
  })
}
