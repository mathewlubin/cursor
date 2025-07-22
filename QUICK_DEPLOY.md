# 🚀 Quick AWS Deployment Guide

Choose your preferred deployment method:

## 🎯 Option 1: AWS Amplify (Easiest - 5 minutes)

**Perfect for**: Beginners, quick prototypes, automatic deployments

```bash
# 1. Push to GitHub
git add . && git commit -m "Deploy to AWS" && git push origin main

# 2. Go to AWS Amplify Console
# 3. Connect GitHub repo and deploy frontend
# 4. Deploy backend as Lambda (see Option 2)
```

**Cost**: ~$1-5/month

---

## ⚡ Option 2: Lambda + S3 (Serverless - 10 minutes)

**Perfect for**: Cost-effective, auto-scaling applications

### Deploy Backend (Lambda):
```bash
# Install SAM CLI
pip install aws-sam-cli

# Deploy backend
chmod +x deploy-scripts/deploy-lambda.sh
./deploy-scripts/deploy-lambda.sh --guided

# Note the API Gateway URL from output
```

### Deploy Frontend (S3):
```bash
# Update API URL in frontend/src/config.js with your Lambda URL
# Then deploy to S3
chmod +x deploy-scripts/deploy-s3.sh
./deploy-scripts/deploy-s3.sh your-unique-bucket-name
```

**Cost**: ~$1-3/month

---

## 🛠️ Option 3: EC2 (Traditional - 15 minutes)

**Perfect for**: Full control, learning AWS

```bash
# 1. Launch EC2 instance (t3.micro for free tier)
# 2. SSH into instance and run:

sudo yum update -y
sudo yum install python3 python3-pip git nginx -y
git clone https://github.com/yourusername/your-repo.git
cd your-repo/backend
pip3 install --user -r requirements.txt
pip3 install --user gunicorn

# 3. Configure services (see full guide in AWS_DEPLOYMENT_GUIDE.md)
# 4. Deploy frontend to S3 (use deploy-s3.sh script)
```

**Cost**: ~$8-15/month

---

## 🐳 Option 4: Containers (Advanced - 20 minutes)

**Perfect for**: Production applications, microservices

```bash
# Build and push Docker images
docker build -t dressme-backend backend/
docker build -t dressme-frontend frontend/

# Deploy to ECS Fargate or EKS
# (See full guide in AWS_DEPLOYMENT_GUIDE.md)
```

**Cost**: ~$30-100/month

---

## 🎯 Recommended Quick Start

**For most users, we recommend Option 2 (Lambda + S3):**

1. **Deploy Backend**:
   ```bash
   pip install aws-sam-cli
   ./deploy-scripts/deploy-lambda.sh --guided
   ```

2. **Update Frontend Config**:
   Edit `frontend/src/config.js` and replace the API URL with your Lambda endpoint.

3. **Deploy Frontend**:
   ```bash
   ./deploy-scripts/deploy-s3.sh
   ```

4. **Done!** 🎉

---

## 📋 Prerequisites

- AWS Account ([Sign up free](https://aws.amazon.com/free/))
- AWS CLI installed and configured (`aws configure`)
- Git repository with your code

---

## 💡 Pro Tips

1. **Custom Domain**: Use Route 53 + ACM for HTTPS and custom domain
2. **Monitoring**: Enable CloudWatch for logs and metrics
3. **CI/CD**: Set up GitHub Actions for automatic deployments
4. **Security**: Use AWS Secrets Manager for sensitive configuration

---

## 🆘 Need Help?

- Check `AWS_DEPLOYMENT_GUIDE.md` for detailed instructions
- Visit [AWS Documentation](https://docs.aws.amazon.com/)
- Use AWS Free Tier to minimize costs
- Test locally first with `./run.sh`

**Total deployment time**: 5-20 minutes depending on option chosen!