const bcrypt = require('bcrypt')

const SALT_ROUNDS = process.env.SALT_ROUNDS

/**
 * Hash the raw password into encrypted password
 * @param {String} rawPassword
 * @returns The encrypted password
 */
const hashPassword = rawPassword => {
  const hash = bcrypt.hashSync(rawPassword, SALT_ROUNDS)
  return hash
}

module.exports = { hashPassword, SALT_ROUNDS }
