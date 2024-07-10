import { describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'

describe('Create Pet Use Case', () => {
  it('Should be able to create a pet', async () => {
    const inMemoryOrgsRepository = new InMemoryOrgsRepository()
    const inMemoryPetsRepository = new InMemoryPetsRepository(
      inMemoryOrgsRepository,
    )
    const createPetUseCase = new CreatePetUseCase(inMemoryPetsRepository)

    const { pet } = await createPetUseCase.execute({
      species: 'dog',
      name: 'Bob',
      dateOfBirth: new Date(),
      color: 'brown',
      weight: '20',
      personality: 'friendly',
      photo: 'randomUrl',
      orgId: '123',
    })

    expect(pet.name).toEqual(expect.any(String))
  })
})
