import { Org, Prisma } from '@prisma/client'

export interface OrgsRepository {
  register(data: Prisma.OrgUncheckedCreateInput): Promise<Org>
  findByUser(user: string): Promise<Org | undefined>
}
