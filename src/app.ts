import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyJwt from '@fastify/jwt'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()
app.register(fastifyJwt, {
  secret: 'findafriendapi',
})
app.register(orgsRoutes)
app.register(petsRoutes)
