import { describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FetchPetByParams } from './fetchPetsByParams'

describe('Create Pet Use Case', () => {
  it('Should be able to create a pet', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrgsRepository,
    )
    const fetchPetByParams = new FetchPetByParams(inMemoryPetsRepository)

    inMemoryPetsRepository.create({
      species: 'dog',
      name: 'Bob',
      dateOfBirth: new Date(),
      color: 'brown',
      weight: 20,
      personality: 'friendly',
      photo: 'randomUrl',
      orgId: '123',
    })

    inMemoryOrgsRepository.register({
      id: '123',
      user: 'SOS Animais',
      passwordHash: '123456',
      city: 'Sao paulo',
      adress: 'Rua Machado, 10',
      phone: '999999999',
    })

    const { pets } = await fetchPetByParams.execute({
      city: 'Sao paulo',
    })
    console.log(pets)
    expect(pets).toEqual(expect.any(Array))
  })
})
