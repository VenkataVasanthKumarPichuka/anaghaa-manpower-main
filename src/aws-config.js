// AWS Configuration for Floci
const AWS_CONFIG = {
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  }
};

// S3 Service
export const S3_CONFIG = {
  ...AWS_CONFIG,
  bucket: 'anaghaa-website-bucket'
};

// DynamoDB Service
export const DYNAMODB_CONFIG = {
  ...AWS_CONFIG,
  tables: {
    users: 'users',
    contacts: 'contacts'
  }
};

// Lambda Service
export const LAMBDA_CONFIG = {
  ...AWS_CONFIG,
  functions: {
    api: 'anaghaa-api'
  }
};

// API Gateway
export const APIGATEWAY_CONFIG = {
  ...AWS_CONFIG,
  apiId: 'your-api-id'
};

export default AWS_CONFIG;