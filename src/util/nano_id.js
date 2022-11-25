const {customAlphabet} = require('nanoid/non-secure');
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 12);

module.exports = () => {
  return nanoid();
};
