const crypto = require('crypto');

// Generate a new RSA private key
const privateKey = crypto.generateKeyPairSync('rsa', {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem'
  }
});

const privkey = privateKey.privateKey
// console.log('Private Key:', privateKey.privateKey);
module.exports = privkey;