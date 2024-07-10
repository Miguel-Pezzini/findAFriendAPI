import { UserAlredyExistsError } from '@/use-cases/errors/user-alredy-exists-error'
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

    const org = await registerUseCase.execute({
      user,
      password,
      city,
      adress,
      phone,
    })

    reply.status(201).send(org)
  } catch (err) {
    if (err instanceof UserAlredyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
