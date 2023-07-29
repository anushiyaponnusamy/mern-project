const crypto = require('crypto');

const generateJWTSecretKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

const jwtSecretKey = generateJWTSecretKey();
console.log('JWT Secret Key:', jwtSecretKey);
