const path = require('path')
require('dotenv').config({
  path: path.resolve(
    __dirname,
    process.env.NODE_ENV == 'development' ? './.env.local' : './.env.prod'
  ),
})
