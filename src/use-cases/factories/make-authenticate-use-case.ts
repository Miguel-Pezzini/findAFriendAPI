import { AuthenticateUseCase } from '../authenticate'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeAuthenticateUseCase() {
  const prismaOrgsRepository = new PrismaOrgsRepository()
  const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository)

  return authenticateUseCase
}
