import { Pet, Prisma } from '@prisma/client'

export interface FindAllParams {
  city: string
  species?: string
  color?: string
  weight?: number
  personality?: string
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findPetByCity(params: FindAllParams): Promise<Pet[] | undefined>
  getPetById(id: string): Promise<Pet>
}
