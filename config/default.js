const path = require('path');

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  host: process.env.HOST || 'http://localhost:',
}