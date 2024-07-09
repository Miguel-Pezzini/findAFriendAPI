import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../create-pet'

export function makePetCreateUseCase() {
  const prismaPetRepository = new PrismaPetRepository()
  const createPetUseCase = new CreatePetUseCase(prismaPetRepository)

  return createPetUseCase
}
