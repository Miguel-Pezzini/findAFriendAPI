import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

describe('Create Pet Use Case', () => {
  it('Should be able to create a pet', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(inMemoryOrgsRepository)

    const { org } = await registerUseCase.execute({
      user: 'SOS Animais',
      password: '123456',
      city: 'São Paulo',
      adress: 'Rua Machado, 10',
      phone: '999999999',
    })

    expect(org.user).toEqual(expect.any(String))
  })
})
