import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetUseCase } from '../get-pet'

export function makeGetPetUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const getPetUseCase = new GetPetUseCase(prismaPetRepository)

  return getPetUseCase
}
