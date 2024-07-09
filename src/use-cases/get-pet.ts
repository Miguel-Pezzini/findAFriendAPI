import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetDoesNotFoundError } from './errors/pet-does-not-found-error'

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

    if (!pet) {
      throw new PetDoesNotFoundError()
    }

    return { pet }
  }
}
