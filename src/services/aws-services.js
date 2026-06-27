import AWS from 'aws-sdk';
import AWS_CONFIG from '../aws-config';

// Configure AWS SDK for Floci
AWS.config.update({
  endpoint: AWS_CONFIG.endpoint,
  region: AWS_CONFIG.region,
  credentials: new AWS.Credentials(
    AWS_CONFIG.credentials.accessKeyId,
    AWS_CONFIG.credentials.secretAccessKey
  )
});

// S3 Service
const s3 = new AWS.S3();

export const uploadToS3 = async (file, key) => {
  const params = {
    Bucket: 'anaghaa-website-bucket',
    Key: key,
    Body: file,
    ContentType: file.type
  };
  return s3.upload(params).promise();
};

export const getFromS3 = async (key) => {
  const params = {
    Bucket: 'anaghaa-website-bucket',
    Key: key
  };
  return s3.getObject(params).promise();
};

// DynamoDB Service
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const addUser = async (user) => {
  const params = {
    TableName: 'users',
    Item: user
  };
  return dynamodb.put(params).promise();
};

export const getUser = async (id) => {
  const params = {
    TableName: 'users',
    Key: { id }
  };
  return dynamodb.get(params).promise();
};

export const addContact = async (contact) => {
  const params = {
    TableName: 'contacts',
    Item: {
      email: contact.email,
      name: contact.name,
      message: contact.message,
      timestamp: new Date().toISOString()
    }
  };
  return dynamodb.put(params).promise();
};

// Lambda Service
const lambda = new AWS.Lambda();

export const invokeLambda = async (functionName, payload) => {
  const params = {
    FunctionName: functionName,
    Payload: JSON.stringify(payload)
  };
  return lambda.invoke(params).promise();
};

// SQS Service
const sqs = new AWS.SQS();

export const sendMessage = async (queueUrl, message) => {
  const params = {
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify(message)
  };
  return sqs.sendMessage(params).promise();
};

// SNS Service
const sns = new AWS.SNS();

export const publishNotification = async (topicArn, message) => {
  const params = {
    TopicArn: topicArn,
    Message: JSON.stringify(message)
  };
  return sns.publish(params).promise();
};

// CloudWatch Logs
const cloudwatch = new AWS.CloudWatchLogs();

export const createLogStream = async (logGroupName, logStreamName) => {
  const params = {
    logGroupName,
    logStreamName
  };
  return cloudwatch.createLogStream(params).promise();
};

export const putLogEvents = async (logGroupName, logStreamName, messages) => {
  const params = {
    logGroupName,
    logStreamName,
    logEvents: messages.map(msg => ({
      message: msg,
      timestamp: Date.now()
    }))
  };
  return cloudwatch.putLogEvents(params).promise();
};