import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  await prisma.org.create({
    data: {
      user: 'SOS Animais',
      passwordHash: await hash('123456', 6),
      city: 'Sao Paulo',
      adress: 'Rua não sei o que, 000',
      phone: '99999999999999',
    },
  })

  const authResponse = await request(app.server).post('/orgs/login').send({
    user: 'SOS Animais',
    password: '123456',
  })

  const { token } = authResponse.body

  return { token }
}
