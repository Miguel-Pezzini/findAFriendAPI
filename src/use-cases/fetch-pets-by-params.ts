import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { InvalidCityProvided } from './errors/invalid-city-provided'

interface RegisterUseCaseRequest {
  city: string
  species?: string
  color?: string
  weight?: number
  personality?: string
}

interface RegisterUseCaseResponse {
  pets: Pet[]
}

export class FetchPetByParams {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    species,
    color,
    weight,
    personality,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const pets = await this.petsRepository.findPetByCity({
      city,
      species,
      color,
      weight,
      personality,
    })

    if (!pets) {
      throw new InvalidCityProvided()
    }

    return { pets }
  }
}
