module.exports = {
  tables: [    
    {
      'TableName': 'Transiter_User',
      'BillingMode': 'PAY_PER_REQUEST',
      'AttributeDefinitions': [
        {
          'AttributeName': 'userName',
          'AttributeType': 'S',
        },
        {
          'AttributeName': 'userRn',
          'AttributeType': 'S',
        },
      ],
      'KeySchema': [
        {
          'AttributeName': 'userName',
          'KeyType': 'HASH',
        },
        {
          'AttributeName': 'userRn',
          'KeyType': 'RANGE',
        },
      ],
    },
    {
      'TableName': 'Transiter_User_Auth',
      'BillingMode': 'PAY_PER_REQUEST',
      'AttributeDefinitions': [
        {
          'AttributeName': 'userName',
          'AttributeType': 'S',
        },
        {
          'AttributeName': 'userRn',
          'AttributeType': 'S',
        },
      ],
      'KeySchema': [
        {
          'AttributeName': 'userName',
          'KeyType': 'HASH',
        },
        {
          'AttributeName': 'userRn',
          'KeyType': 'RANGE',
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
