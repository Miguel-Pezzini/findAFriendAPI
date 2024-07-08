import { describe, expect, it } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

describe('Create Pet Use Case', () => {
  it('Should be able to create a pet', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryOrgsRepository)

    await inMemoryOrgsRepository.register({
      user: 'SOS Animais',
      passwordHash: await hash('123456', 6),
      city: 'São Paulo',
      adress: 'Rua Machado, 10',
      phone: '999999999',
    })

    const { org } = await authenticateUseCase.execute({
      user: 'SOS Animais',
      password: '123456',
    })

    expect(org.user).toEqual(expect.any(String))
  })
})
