#!/bin/bash

ENDPOINT="--endpoint-url http://localhost:4566"
REGION="--region us-east-1"

echo "🚀 Setting up AWS services in Floci..."

# ========== IAM ==========
echo "Creating IAM roles..."
aws iam create-role \
  --role-name ecs-task-role \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ecs-tasks.amazonaws.com"},"Action":"sts:AssumeRole"}]}' \
  $ENDPOINT $REGION

aws iam create-role \
  --role-name lambda-role \
  --assume-role-policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}' \
  $ENDPOINT $REGION

# ========== EC2 ==========
echo "Setting up EC2..."
aws ec2 create-key-pair --key-name anaghaa-key $ENDPOINT $REGION
aws ec2 create-security-group \
  --group-name anaghaa-sg \
  --description "Anaghaa Manpower Security Group" \
  $ENDPOINT $REGION

# ========== S3 ==========
echo "Creating S3 buckets..."
aws s3 mb s3://anaghaa-website-bucket $ENDPOINT $REGION
aws s3 mb s3://anaghaa-assets-bucket $ENDPOINT $REGION

# ========== ECR ==========
echo "Creating ECR repository..."
aws ecr create-repository --repository-name anaghaa-manpower $ENDPOINT $REGION

# ========== ECS ==========
echo "Creating ECS cluster..."
aws ecs create-cluster --cluster-name anaghaa-cluster $ENDPOINT $REGION

# ========== DynamoDB ==========
echo "Creating DynamoDB tables..."
aws dynamodb create-table \
  --table-name users \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  $ENDPOINT $REGION

aws dynamodb create-table \
  --table-name contacts \
  --attribute-definitions AttributeName=email,AttributeType=S \
  --key-schema AttributeName=email,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  $ENDPOINT $REGION

# ========== Lambda ==========
echo "Creating Lambda functions..."
cat > /tmp/lambda-function.js << 'EOF'
exports.handler = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Hello from Floci Lambda!' })
    };
};
EOF

zip -j /tmp/lambda-function.zip /tmp/lambda-function.js

aws lambda create-function \
  --function-name anaghaa-api \
  --runtime nodejs18.x \
  --role arn:aws:iam::000000000000:role/lambda-role \
  --handler lambda-function.handler \
  --zip-file fileb:///tmp/lambda-function.zip \
  $ENDPOINT $REGION

# ========== API Gateway ==========
echo "Creating API Gateway..."
API_ID=$(aws apigateway create-rest-api --name anaghaa-api $ENDPOINT $REGION --query 'id' --output text)
echo "API ID: $API_ID"

# ========== SQS ==========
echo "Creating SQS queues..."
aws sqs create-queue --queue-name anaghaa-email-queue $ENDPOINT $REGION
aws sqs create-queue --queue-name anaghaa-order-queue $ENDPOINT $REGION

# ========== SNS ==========
echo "Creating SNS topics..."
aws sns create-topic --name anaghaa-notifications $ENDPOINT $REGION

# ========== CloudWatch ==========
echo "Creating CloudWatch log groups..."
aws logs create-log-group --log-group-name /anaghaa/application $ENDPOINT $REGION
aws logs create-log-group --log-group-name /anaghaa/lambda $ENDPOINT $REGION

echo "✅ All AWS services created in Floci!"
echo ""
echo "Services created:"
echo "  - IAM Roles: ecs-task-role, lambda-role"
echo "  - EC2: Key pair, Security Group"
echo "  - S3: anaghaa-website-bucket, anaghaa-assets-bucket"
echo "  - ECR: anaghaa-manpower"
echo "  - ECS: anaghaa-cluster"
echo "  - DynamoDB: users, contacts"
echo "  - Lambda: anaghaa-api"
echo "  - API Gateway: anaghaa-api (ID: $API_ID)"
echo "  - SQS: anaghaa-email-queue, anaghaa-order-queue"
echo "  - SNS: anaghaa-notifications"
echo "  - CloudWatch: /anaghaa/application, /anaghaa/lambda"