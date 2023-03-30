const path = require('path');
require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost:',
  dburl: process.env.DBURL,
  origin: process.env.ORIGIN,
  secret_cookie: process.env.SECRET_COOKIE,
  secret_access_token: process.env.SECRET_ACCESS_TOKEN,
}