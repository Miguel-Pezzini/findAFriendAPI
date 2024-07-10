import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-org'

describe('Search Pet By Query (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should search a pet by queries', async () => {
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

    const response = await request(app.server)
      .get(`/pets/indexAll?city=Sao%20Paulo`)
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
