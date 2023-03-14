const auth = require('./auth')

jest.mock('bcrypt', () => {
  return {
    hashSync: jest.fn(() => 'some_encrypted_password'),
  }
})

describe('utils/auth', () => {
  it('should hash the raw password', () => {
    const rawPassword = 'some_password'

    const encryptedPassword = auth.hashPassword(rawPassword)

    expect(encryptedPassword).not.toBe(rawPassword)
  })
})
