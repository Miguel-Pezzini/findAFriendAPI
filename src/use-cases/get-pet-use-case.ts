import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface RegisterUseCaseRequest {
  id: string
}

interface RegisterUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const pet = await this.petsRepository.getPetById(id)

    return { pet }
  }
}
