const {generateUsername} = require('unique-username-generator');

const anonymousGenerator = () => {
  return generateUsername();
}

module.exports = {
  anonymousGenerator,
}