import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
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
