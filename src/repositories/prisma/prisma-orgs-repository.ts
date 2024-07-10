import { Prisma, Org } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async register(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByUser(user: string): Promise<Org | undefined> {
    const org = await prisma.org.findUnique({ where: { user } })

    return org || undefined
  }
}
