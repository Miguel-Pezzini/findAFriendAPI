import { InvalidCityProvidedError } from '@/use-cases/errors/invalid-city-provided-error'
import { makeFetchPetsByParamsUseCase } from '@/use-cases/factories/make-fetch-pets-by-params-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function indexAll(request: FastifyRequest, reply: FastifyReply) {
  const querysSchema = z.object({
    species: z.string().optional(),
    color: z.string().optional(),
    weight: z.string().optional(),
    personality: z.string().optional(),
    city: z.string(),
  })
  const { species, color, weight, personality, city } = querysSchema.parse(
    request.query,
  )

  try {
    const fetchPetsByParamsUseCase = makeFetchPetsByParamsUseCase()
    const pets = await fetchPetsByParamsUseCase.execute({
      city,
      species,
      color,
      weight,
      personality,
    })

    reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof InvalidCityProvidedError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
