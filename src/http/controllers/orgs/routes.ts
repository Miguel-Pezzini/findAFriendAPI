import { authenticate } from './authenticate'
import { register } from './register'
import { FastifyInstance } from 'fastify'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs/register', register)
  app.post('/orgs/login', authenticate)
}
