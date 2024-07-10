import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should register an org', async () => {
    const response = await request(app.server).post('/orgs/register').send({
      user: 'SOS Animais',
      password: '123456',
      city: 'Sao Paulo',
      adress: 'Rua não sei o que, 000',
      phone: '99999999999999',
    })

    expect(response.status).toBe(201)
  })

  it('should not register two orgs with the same email', async () => {
    await request(app.server).post('/orgs/register').send({
      user: 'SOS Animais',
      password: '123456',
      city: 'Sao Paulo',
      adress: 'Rua não sei o que, 000',
      phone: '99999999999999',
    })

    const response = await request(app.server).post('/orgs/register').send({
      user: 'SOS Animais',
      password: '123456',
      city: 'Sao Paulo',
      adress: 'Rua não sei o que, 000',
      phone: '99999999999999',
    })

    expect(response.status).toBe(409)
  })
})
