import { describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { GetPetUseCase } from './get-pet-use-case'

describe('Create Pet Use Case', () => {
  it('Should be able to create a pet', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrgsRepository,
    )
    const getPetUseCase = new GetPetUseCase(inMemoryPetsRepository)

    const petOne = inMemoryPetsRepository.create({
      species: 'dog',
      name: 'Bob',
      dateOfBirth: new Date(),
      color: 'brown',
      weight: 20,
      personality: 'friendly',
      photo: 'randomUrl',
      orgId: '123',
    })

    const { pet } = await getPetUseCase.execute({ id: (await petOne).id })

    expect(pet.name).toEqual('Bob')
  })
})
