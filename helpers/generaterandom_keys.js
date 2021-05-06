const crypto = require('crypto')

const genKey = crypto.randomBytes(32).toString('hex');
const genKey1 = crypto.randomBytes(32).toString('hex');
console.table({genKey, genKey1});