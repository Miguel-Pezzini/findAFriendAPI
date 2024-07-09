import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByParams } from '../fetch-pets-by-params'

export function makeFetchPetsByParamsUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const fetchPetByParams = new FetchPetByParams(prismaPetRepository)

  return fetchPetByParams
}
