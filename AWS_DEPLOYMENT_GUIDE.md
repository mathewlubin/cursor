# AWS Deployment Guide for DressMe AI

This guide provides multiple ways to deploy your DressMe AI webapp on AWS, from simple to enterprise-level solutions.

## 🚀 Deployment Options Overview

| Option | Complexity | Cost | Scalability | Best For |
|--------|------------|------|-------------|----------|
| **AWS Amplify** | ⭐ | $ | ⭐⭐ | Quick prototypes |
| **EC2 + S3** | ⭐⭐ | $$ | ⭐⭐⭐ | Full control |
| **Lambda + CloudFront** | ⭐⭐⭐ | $ | ⭐⭐⭐⭐ | Serverless |
| **ECS Fargate** | ⭐⭐⭐⭐ | $$$ | ⭐⭐⭐⭐⭐ | Production apps |

---

## 🎯 Option 1: AWS Amplify (Recommended for Beginners)

**Best for**: Quick deployment, automatic CI/CD, minimal configuration

### Prerequisites
- AWS Account
- GitHub repository with your code

### Steps

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy Frontend with AWS Amplify**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
   - Click "New app" → "Host web app"
   - Connect your GitHub repository
   - Choose the `frontend` folder as the root directory
   - Configure build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: build
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Deploy Backend with AWS Lambda**
   - Create a Lambda function (see Lambda section below)
   - Update frontend API endpoint in `App.js`

### Cost Estimate
- **Amplify**: ~$1-5/month for small apps
- **Lambda**: ~$0.20/million requests

---

## 🛠️ Option 2: EC2 + S3 (Full Control)

**Best for**: Learning AWS, full control over environment

### Architecture
```
Internet → CloudFront → S3 (Frontend) + ALB → EC2 (Backend)
```

### Steps

#### A. Deploy Backend on EC2

1. **Launch EC2 Instance**
   ```bash
   # Choose Amazon Linux 2
   # Instance type: t3.micro (free tier)
   # Security group: Allow HTTP (80), HTTPS (443), SSH (22)
   ```

2. **Setup EC2 Instance**
   ```bash
   # SSH into your instance
   ssh -i your-key.pem ec2-user@your-instance-ip
   
   # Install dependencies
   sudo yum update -y
   sudo yum install python3 python3-pip git nginx -y
   
   # Clone your repository
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   
   # Install Python dependencies
   cd backend
   pip3 install --user -r requirements.txt
   pip3 install --user gunicorn
   ```

3. **Configure Gunicorn**
   ```bash
   # Create gunicorn service file
   sudo nano /etc/systemd/system/dressme-api.service
   ```
   
   Add this content:
   ```ini
   [Unit]
   Description=DressMe AI API
   After=network.target
   
   [Service]
   User=ec2-user
   WorkingDirectory=/home/ec2-user/your-repo/backend
   Environment=PATH=/home/ec2-user/.local/bin
   ExecStart=/home/ec2-user/.local/bin/gunicorn --bind 0.0.0.0:5000 app:app
   Restart=always
   
   [Install]
   WantedBy=multi-user.target
   ```

4. **Configure Nginx**
   ```bash
   sudo nano /etc/nginx/nginx.conf
   ```
   
   Add server block:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:5000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

5. **Start Services**
   ```bash
   sudo systemctl enable dressme-api
   sudo systemctl start dressme-api
   sudo systemctl enable nginx
   sudo systemctl start nginx
   ```

#### B. Deploy Frontend on S3 + CloudFront

1. **Build React App**
   ```bash
   cd frontend
   # Update API endpoint to your EC2 public IP
   # Edit src/App.js: const API_BASE = 'http://your-ec2-ip'
   npm run build
   ```

2. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://your-unique-bucket-name
   aws s3 website s3://your-unique-bucket-name --index-document index.html
   ```

3. **Upload Build Files**
   ```bash
   aws s3 sync build/ s3://your-unique-bucket-name --delete
   ```

4. **Setup CloudFront** (Optional)
   - Create CloudFront distribution
   - Origin: Your S3 bucket
   - Default root object: index.html

### Cost Estimate
- **EC2 t3.micro**: ~$8.50/month
- **S3**: ~$1-3/month
- **CloudFront**: ~$1/month + data transfer

---

## ⚡ Option 3: Serverless (Lambda + API Gateway + S3)

**Best for**: Cost-effective scaling, production apps

### Architecture
```
Internet → CloudFront → S3 (Frontend) + API Gateway → Lambda (Backend)
```

### Steps

#### A. Prepare Lambda Function

1. **Create Lambda-compatible app**
   
   Create `backend/lambda_handler.py`:
   ```python
   import json
   from mangum import Mangum
   from app import app
   
   # Configure for Lambda
   app.config['ENV'] = 'production'
   
   # Wrap Flask app for Lambda
   handler = Mangum(app, lifespan="off")
   
   def lambda_handler(event, context):
       return handler(event, context)
   ```

2. **Create deployment package**
   ```bash
   cd backend
   pip install mangum -t .
   zip -r deployment.zip . -x "*.pyc" "__pycache__/*"
   ```

#### B. Deploy Backend with SAM or Serverless Framework

**Using AWS SAM:**

1. **Install SAM CLI**
   ```bash
   pip install aws-sam-cli
   ```

2. **Create `template.yaml`**:
   ```yaml
   AWSTemplateFormatVersion: '2010-09-09'
   Transform: AWS::Serverless-2016-10-31
   
   Resources:
     DressMeAPI:
       Type: AWS::Serverless::Function
       Properties:
         CodeUri: backend/
         Handler: lambda_handler.lambda_handler
         Runtime: python3.9
         Environment:
           Variables:
             CORS_ORIGINS: "*"
         Events:
           DressMeAPI:
             Type: Api
             Properties:
               Path: /{proxy+}
               Method: ANY
               Cors:
                 AllowMethods: "'GET,POST,OPTIONS'"
                 AllowHeaders: "'content-type'"
                 AllowOrigin: "'*'"
   
   Outputs:
     DressMeAPI:
       Description: "API Gateway endpoint URL"
       Value: !Sub "https://${ServerlessRestApi}.execute-api.${AWS::Region}.amazonaws.com/Prod/"
   ```

3. **Deploy**
   ```bash
   sam build
   sam deploy --guided
   ```

#### C. Deploy Frontend

Same as EC2 option but update API endpoint to your API Gateway URL.

### Cost Estimate
- **Lambda**: ~$0.20/million requests + compute time
- **API Gateway**: ~$3.50/million requests
- **S3 + CloudFront**: ~$1-5/month

---

## 🐳 Option 4: Container Deployment (ECS Fargate)

**Best for**: Production applications, microservices

### Steps

1. **Create Dockerfiles**

   `backend/Dockerfile`:
   ```dockerfile
   FROM python:3.9-slim
   
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   
   COPY . .
   EXPOSE 5000
   
   CMD ["gunicorn", "--bind", "0.0.0.0:5000", "app:app"]
   ```

   `frontend/Dockerfile`:
   ```dockerfile
   FROM node:16-alpine as build
   
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/build /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Push to ECR**
   ```bash
   # Create ECR repositories
   aws ecr create-repository --repository-name dressme-backend
   aws ecr create-repository --repository-name dressme-frontend
   
   # Build and push
   docker build -t dressme-backend backend/
   docker build -t dressme-frontend frontend/
   
   # Tag and push to ECR
   # (Follow ECR push commands from console)
   ```

3. **Create ECS Cluster and Services**
   - Use AWS Console or CloudFormation
   - Configure Application Load Balancer
   - Set up auto-scaling

### Cost Estimate
- **Fargate**: ~$30-100/month depending on resources
- **ALB**: ~$22/month
- **ECR**: ~$1/GB/month

---

## 🔧 Production Considerations

### Security
```bash
# Use AWS Secrets Manager for sensitive data
aws secretsmanager create-secret --name dressme-config --secret-string '{"API_KEY":"your-key"}'
```

### Monitoring
- **CloudWatch**: Logs and metrics
- **X-Ray**: Distributed tracing
- **AWS Config**: Configuration compliance

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to AWS
        run: |
          # Your deployment commands
```

### Custom Domain
1. **Register domain** in Route 53
2. **Create SSL certificate** with ACM
3. **Configure CloudFront** with custom domain
4. **Update DNS** records

---

## 💰 Cost Comparison

| Traffic Level | Amplify | EC2+S3 | Lambda | ECS |
|---------------|---------|--------|--------|-----|
| **Low (1K req/month)** | $2 | $10 | $1 | $35 |
| **Medium (100K req/month)** | $5 | $15 | $5 | $50 |
| **High (1M req/month)** | $15 | $25 | $25 | $100 |

---

## 🚀 Quick Start Commands

### For AWS Amplify (Fastest)
```bash
# 1. Push to GitHub
git add . && git commit -m "Deploy to AWS" && git push

# 2. Go to AWS Amplify Console and connect repo
# 3. Deploy!
```

### For Lambda (Serverless)
```bash
# 1. Install SAM
pip install aws-sam-cli

# 2. Create template.yaml (see above)
# 3. Deploy
sam build && sam deploy --guided
```

### For EC2 (Traditional)
```bash
# 1. Launch EC2 instance
# 2. SSH and setup (see detailed steps above)
# 3. Deploy frontend to S3
```

---

## 🛠️ Troubleshooting

### Common Issues
1. **CORS errors**: Update CORS origins in backend
2. **API not accessible**: Check security groups
3. **Build failures**: Verify Node.js version compatibility
4. **Lambda timeout**: Increase timeout in function config

### Monitoring Commands
```bash
# CloudWatch logs
aws logs describe-log-groups --log-group-name-prefix "/aws/lambda/dressme"

# Check API Gateway
aws apigateway get-rest-apis

# Monitor costs
aws ce get-cost-and-usage --time-period Start=2024-01-01,End=2024-01-31 --granularity MONTHLY --metrics BlendedCost
```

---

## 📚 Additional Resources

- [AWS Free Tier](https://aws.amazon.com/free/)
- [AWS Architecture Center](https://aws.amazon.com/architecture/)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [AWS Cost Calculator](https://calculator.aws/)

Choose the deployment option that best fits your needs, budget, and technical requirements!