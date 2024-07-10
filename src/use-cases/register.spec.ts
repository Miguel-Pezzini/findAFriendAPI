import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { UserAlredyExistsError } from './errors/user-alredy-exists-error'
import { compare } from 'bcryptjs'

describe('Register org use case', () => {
  it('Should be able to register an org', async () => {
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

  it('Should not be able to register two orgs with the same user', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(inMemoryOrgsRepository)
    await registerUseCase.execute({
      user: 'SOS Animais',
      password: '123456',
      city: 'São Paulo',
      adress: 'Rua Machado, 10',
      phone: '999999999',
    })

    await expect(() =>
      registerUseCase.execute({
        user: 'SOS Animais',
        password: '123456',
        city: 'São Paulo',
        adress: 'Rua Machado, 10',
        phone: '999999999',
      }),
    ).rejects.toBeInstanceOf(UserAlredyExistsError)
  })

  it('Should hash user password upon registration', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const registerUseCase = new RegisterUseCase(inMemoryOrgsRepository)
    const { org } = await registerUseCase.execute({
      user: 'SOS Animais',
      password: '123456',
      city: 'São Paulo',
      adress: 'Rua Machado, 10',
      phone: '999999999',
    })

    const isPasswordCorrenctlyHashed = await compare('123456', org.passwordHash)
    expect(isPasswordCorrenctlyHashed).toBe(true)
  })
})
