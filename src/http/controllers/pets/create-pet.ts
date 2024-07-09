import { makePetCreateUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const bodyschema = z.object({
    species: z.string(),
    name: z.string(),
    dateOfBirth: z.string().datetime(),
    color: z.string(),
    weight: z.number(),
    personality: z.string(),
    photo: z.string(),
  })

  const { species, name, dateOfBirth, color, weight, personality, photo } =
    bodyschema.parse(request.body)

  const orgId = request.user.sub

  const createPetUseCase = makePetCreateUseCase()

  const pet = createPetUseCase.execute({
    species,
    name,
    dateOfBirth,
    color,
    weight,
    personality,
    photo,
    orgId,
  })

  reply.status(201).send({ pet })
}
