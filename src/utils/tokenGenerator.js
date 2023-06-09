const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

module.exports = (payload) => jwt.sign(payload, secret, jwtConfig);
