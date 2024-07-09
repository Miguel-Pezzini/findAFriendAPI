import { Pet, Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'
import { InMemoryOrgsRepository } from './in-memory-orgs-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async getPetById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      throw new Error('Pet not found')
    }

    return pet
  }

  async findPetByCity(params: FindAllParams) {
    const allOrgsByCity = this.orgsRepository.items.filter(
      (org) => org.city === params.city,
    )

    const pets = this.items
      .filter((item) => allOrgsByCity.some((org) => org.id === item.orgId))
      .filter((item) =>
        params.species ? item.species === params.species : true,
      )
      .filter((item) => (params.color ? item.color === params.color : true))
      .filter((item) => (params.weight ? item.weight === params.weight : true))
      .filter((item) =>
        params.personality ? item.personality === params.personality : true,
      )

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pets = {
      id: randomUUID(),
      species: data.species,
      name: data.name,
      dateOfBirth: new Date(data.dateOfBirth),
      color: data.color,
      weight: data.weight,
      personality: data.personality,
      photo: data.photo,
      orgId: data.orgId,
    }
    this.items.push(pets)

    return pets
  }
}
