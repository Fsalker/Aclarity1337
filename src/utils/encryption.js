const Cryptr = require("cryptr");

const encrypt = (msg, key) => {
  const cryptr = new Cryptr(key);
  return cryptr.encrypt(msg);
};

const decrypt = (msg, key) => {
  const cryptr = new Cryptr(key);
  return cryptr.decrypt(msg);
};

module.exports = {
  encrypt,
  decrypt,
};
