const aws = require('aws-sdk');

aws.config.update(
    {
      endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
      sslEnabled: false,
      region: 'local',
    },
);
