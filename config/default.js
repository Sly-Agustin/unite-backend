const path = require('path');
require('dotenv').config()

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost:',
  dburl: process.env.DBURL,
  origin: process.env.ORIGIN,
  secretCookie: process.env.SECRET_COOKIE
}