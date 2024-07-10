import { FastifyInstance } from 'fastify'
import { create } from './create-pet'
import { index } from './index'
import { indexAll } from './indexAll'
import { verifyJWT } from '@/http/middlewares/verifyJWT'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets/create', { onRequest: [verifyJWT] }, create)
  app.get('/pets/index/:id', index)
  app.get('/pets/indexAll', indexAll)
}
