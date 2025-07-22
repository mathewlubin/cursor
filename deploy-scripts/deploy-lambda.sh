#!/bin/bash

echo "🚀 Deploying DressMe AI to AWS Lambda..."

# Check if SAM CLI is installed
if ! command -v sam &> /dev/null; then
    echo "❌ AWS SAM CLI is not installed. Please install it first:"
    echo "   pip install aws-sam-cli"
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI is not configured. Please run 'aws configure' first."
    exit 1
fi

# Create deployment directory
mkdir -p deploy-lambda
cd deploy-lambda

# Copy backend files
echo "📦 Preparing backend files..."
cp -r ../backend/* .
cp ../template.yaml .

# Install Lambda-specific dependencies
echo "📥 Installing Lambda dependencies..."
pip install -r requirements-lambda.txt -t .

# Build and deploy with SAM
echo "🔨 Building SAM application..."
sam build

echo "🚀 Deploying to AWS..."
if [ "$1" = "--guided" ]; then
    sam deploy --guided
else
    sam deploy --no-confirm-changeset --no-fail-on-empty-changeset
fi

# Get the API endpoint
echo "✅ Deployment complete!"
echo "🌐 API Endpoint:"
aws cloudformation describe-stacks --stack-name sam-app --query 'Stacks[0].Outputs[?OutputKey==`DressMeAPI`].OutputValue' --output text

# Clean up
cd ..
rm -rf deploy-lambda

echo ""
echo "📝 Next steps:"
echo "1. Update your frontend API endpoint with the URL above"
echo "2. Deploy your frontend to S3 or Amplify"
echo "3. Test your application!"