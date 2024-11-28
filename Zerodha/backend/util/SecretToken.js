const jwt = require('jsonwebtoken');

const createSecretToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.TOKEN_KEY, {
    expiresIn: '3d',
  });
};

module.exports = { createSecretToken };
