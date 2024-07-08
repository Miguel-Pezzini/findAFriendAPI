import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

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
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {}
}
