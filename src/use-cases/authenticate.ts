import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'

interface AuthenticateUseCaseRequest {
  user: string
  password: string
}

interface AuthenticateUseCaseResponse {
  org: Org
}

export class AuthenticateUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    user,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const org = await this.orgsRepository.findByUser(user)

    if (!org) {
      throw new Error('Invalid credentials')
    }

    const isPasswordCorrect = await compare(password, org.passwordHash)

    if (!isPasswordCorrect) {
      throw new Error('Invalid Crendetials')
    }

    return { org }
  }
}
