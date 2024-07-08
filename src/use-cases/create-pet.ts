import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  species: string
  name: string
  dateOfBirth: string | Date
  color: string
  weight: number
  personality: string
  photo: string
  orgId: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    species,
    name,
    dateOfBirth,
    color,
    weight,
    personality,
    photo,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      species,
      name,
      dateOfBirth,
      color,
      weight,
      personality,
      photo,
      orgId,
    })
    return { pet }
  }
}
