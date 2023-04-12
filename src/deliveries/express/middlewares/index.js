const authJwt = require('./authentication');
const verifySignUp = require('./verifySignUp');
const verifyMod = require('./verifyMod');
const verifyModOwner = require('./verifyModOwner');
const verifyGame = require('./verifyGame')

module.exports = {
  authJwt,
  verifySignUp,
  verifyMod,
  verifyModOwner,
  verifyGame
};