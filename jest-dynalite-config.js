module.exports = {
  tables: [    
    {
      'TableName': 'TransiterUserDdb',
      'BillingMode': 'PAY_PER_REQUEST',
      'AttributeDefinitions': [
        {
          'AttributeName': 'userRn',
          'AttributeType': 'S',
        },
      ],
      'KeySchema': [
        {
          'AttributeName': 'userRn',
          'KeyType': 'HASH',
        },
      ],
    },

  ],
  basePort: 8000,
};
