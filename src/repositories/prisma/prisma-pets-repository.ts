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

  async findPetByCity(params: FindAllParams) {
    const petsByCity = await prisma.pet.findMany({
      where: {
        species: params.species,
        color: params.color,
        weight: params.weight,
        personality: params.personality,
        org: {
          city: {
            contains: params.city,
            mode: 'insensitive',
          },
        },
      },
    })

    if (!petsByCity) {
      throw new Error('Invalid city')
    }

    return petsByCity
  }

  async getPetById(id: string) {
    const pet = await prisma.pet.findUnique({ where: { id } })

    if (!pet) {
      throw new Error('Invalid Id')
    }

    return pet
  }
}
