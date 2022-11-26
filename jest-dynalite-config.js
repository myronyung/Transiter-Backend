module.exports = {
  tables: [    
    {
      'TableName': 'Transiter_User',
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
    {
      'TableName': 'Transiter_Stop_Review',
      'BillingMode': 'PAY_PER_REQUEST',
      'AttributeDefinitions': [
        {
          'AttributeName': 'busStop',
          'AttributeType': 'S',
        },
        {
          'AttributeName': 'stopReviewRn',
          'AttributeType': 'S',
        },
      ],
      'KeySchema': [
        {
          'AttributeName': 'busStop',
          'KeyType': 'HASH',
        },
        {
          'AttributeName': 'stopReviewRn',
          'KeyType': 'RANGE',
        },
      ],
    },
  ],
  basePort: 8000,
};
