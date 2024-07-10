import { InvalidCityProvidedError } from '@/use-cases/errors/invalid-city-provided-error'
import { makeFetchPetsByParamsUseCase } from '@/use-cases/factories/make-fetch-pets-by-params-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function indexAll(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    city: z.string(),
  })
  const querysSchema = z.object({
    species: z.string(),
    color: z.string(),
    weight: z.number(),
    personality: z.string(),
  })
  const { city } = paramsSchema.parse(request.params)
  const { species, color, weight, personality } = querysSchema.parse(
    request.query,
  )

  try {
    const fetchPetsByParamsUseCase = makeFetchPetsByParamsUseCase()
    const pets = fetchPetsByParamsUseCase.execute({
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
