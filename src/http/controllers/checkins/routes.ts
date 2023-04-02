import { verifyJWT } from '@/http/middlewares/verify.jwt'
import { FastifyInstance } from 'fastify'
import { create } from './create'
import { validate } from './valitade'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch('/check-ins/:checkInId/validate', validate)
}
