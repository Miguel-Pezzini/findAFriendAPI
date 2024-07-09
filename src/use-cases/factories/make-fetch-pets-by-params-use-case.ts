import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPetByParams } from '../fetch-Pets-By-Params'

export function makeFetchPetsByParamsUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const fetchPetByParams = new FetchPetByParams(prismaPetRepository)

  return fetchPetByParams
}
