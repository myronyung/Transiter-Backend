const {generateUsername} = require('unique-username-generator');

const userNameGenerator = (user) => {
  return `${user.firstName}_${user.lastName}`;
};

const anonymousGenerator = () => {
  return generateUsername();
}

module.exports = {
  userNameGenerator,
  anonymousGenerator,
}