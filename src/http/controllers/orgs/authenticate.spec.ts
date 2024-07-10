import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate an org', async () => {
    await request(app.server).post('/orgs/register').send({
      user: 'SOS Animais',
      password: '123456',
      city: 'Sao Paulo',
      adress: 'Rua não sei o que, 000',
      phone: '99999999999999',
    })

    const response = await request(app.server).post('/orgs/login').send({
      user: 'SOS Animais',
      password: '123456',
    })

    expect(response.status).toBe(200)
  })
})
