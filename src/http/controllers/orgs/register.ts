import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    user: z.string(),
    password: z.string(),
    city: z.string(),
    adress: z.string(),
    phone: z.string(),
  })

  const { user, password, city, adress, phone } = bodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    registerUseCase.execute({
      user,
      password,
      city,
      adress,
      phone,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
