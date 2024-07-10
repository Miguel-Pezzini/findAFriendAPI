import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-org'
import { prisma } from '@/lib/prisma'

describe('Search Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should search a pet by id', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/pets/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        species: 'dog',
        name: 'bob',
        dateOfBirth: '2023-09-15T12:00:00Z',
        color: 'brown',
        weight: '50',
        personality: 'friendly',
        photo: 'urlaleatoria',
      })

    const pet = await prisma.pet.findFirst({
      where: { dateOfBirth: '2023-09-15T12:00:00Z' },
    })

    const response = await request(app.server)
      .get(`/pets/index/${pet?.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        species: 'dog',
        name: 'bob',
        dateOfBirth: '2023-09-15T12:00:00Z',
        color: 'brown',
        weight: '50',
        personality: 'friendly',
        photo: 'urlaleatoria',
      })

    expect(response.status).toBe(200)
  })
})
