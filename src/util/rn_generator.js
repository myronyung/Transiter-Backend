const idGenerator = require('../../util/nano_id');

exports.stopReviewRnGenerator = () => {
  const id = idGenerator();
  return `stopReviewRn-${getVersion()}-${id}`;
};

exports.userRnGenerator = () => {
  const id = idGenerator();
  return `userRn-${getVersion()}-${id}`;
};

const getVersion = () => {
  return 'V1';
};
