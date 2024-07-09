import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'

interface RegisterUseCaseRequest {
  user: string
  password: string
  city: string
  adress: string
  phone: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    user,
    password,
    city,
    adress,
    phone,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const orgAlredyExists = await this.orgsRepository.findByUser(user)

    if (orgAlredyExists) {
      throw new UserAlredyExistsError()
    }

    const org = await this.orgsRepository.register({
      id: randomUUID(),
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
      passwordHash,
      city,
      adress,
      phone,
    })

    return { org }
  }
}
