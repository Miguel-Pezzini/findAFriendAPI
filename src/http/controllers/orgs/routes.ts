import { register } from './register'
import { FastifyInstance } from 'fastify'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('register', register)
}
