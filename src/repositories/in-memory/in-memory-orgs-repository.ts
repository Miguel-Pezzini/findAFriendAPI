import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []
  async register(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: data.id || randomUUID(),
      user: data.user,
      createdAt: new Date() || data.createdAt,
      updatedAt: new Date() || data.updatedAt,
      passwordHash: data.user,
      city: data.city,
      adress: data.city,
      phone: data.phone,
    }

    this.items.push(org)

    return org
  }
}
