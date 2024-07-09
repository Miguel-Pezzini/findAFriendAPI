import { Prisma } from '@prisma/client'
import { FindAllParams, PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'
import { randomUUID } from 'crypto'

export class PrismaPetRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        id: randomUUID() || data.id,
        species: data.species,
        name: data.name,
        dateOfBirth: new Date(data.dateOfBirth),
        color: data.color,
        weight: data.weight,
        personality: data.personality,
        photo: data.photo,
        orgId: data.orgId,
      },
    })

    return pet
  }

  findPetByCity(params: FindAllParams): Promise<
    {
      id: string
      species: string
      name: string
      dateOfBirth: Date
      color: string
      weight: number
      personality: string
      photo: string
      orgId: string
    }[]
  > {
    throw new Error('Method not implemented.')
  }

  async getPetById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })

    if (!pet) {
      throw new Error('Invalid Id')
    }

    return pet
  }
}
