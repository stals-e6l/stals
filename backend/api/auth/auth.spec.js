const request = require('../../utils/request')

jest.mock('../../entities/user', () => ({
  create: jest.fn(() => ({
    username: 'username',
    password: 'password',
  })),
  findOne: jest.fn(args => ({
    username: args.username,
    password: args.password,
  })),
}))

describe('auth.spec.js', () => {
  it('should signs up new user given correct username and password', async () => {
    const payload = {
      username: 'username',
      password: 'password',
    }

    const res = await request.post('/api/signup').send(payload)

    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('status', 'ok')
    expect(res.body).toHaveProperty('data.username', payload.username)
    expect(res.body).toHaveProperty('data.password', payload.password)
  })
  it('should signs in existing user given correct username and password', async () => {
    const payload = {
      username: 'username',
      password: 'password',
    }

    const res = await request.post('/api/signin').send(payload)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('status', 'ok')
    expect(res.body).toHaveProperty('data.token', 'sometoken')
  })
})
