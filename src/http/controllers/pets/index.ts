import { PetDoesNotFoundError } from '@/use-cases/errors/pet-does-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function index(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    id: z.string(),
  })

  const { id } = bodySchema.parse(request.params)

  try {
    const getPetUseCase = makeGetPetUseCase()
    const pet = await getPetUseCase.execute({ id })

    reply.status(200).send(pet)
  } catch (err) {
    if (err instanceof PetDoesNotFoundError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
