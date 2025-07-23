# 🚀 How to Deploy DressMe AI - Step by Step

## 🎯 Choose Your Deployment Method

### **Option 1: AWS Amplify (Recommended for Beginners)**
**Time**: 5 minutes | **Cost**: $1-5/month | **Difficulty**: ⭐ Easy

#### Step 1: Push to GitHub
```bash
# If you haven't already, initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/dressme-ai.git
git push -u origin main
```

#### Step 2: Deploy Frontend with Amplify
1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click **"New app"** → **"Host web app"**
3. Connect your GitHub account and select your repository
4. Choose `frontend` as the root directory
5. Amplify will auto-detect React and configure build settings
6. Click **"Save and deploy"**

#### Step 3: Deploy Backend to Lambda
```bash
# Install AWS SAM CLI
pip install aws-sam-cli

# Configure AWS CLI (if not done)
aws configure

# Deploy backend
./deploy-scripts/deploy-lambda.sh --guided
```

#### Step 4: Update Frontend API URL
1. After Lambda deployment, you'll get an API Gateway URL
2. Update `frontend/src/config.js`:
```javascript
production: {
  API_BASE_URL: 'https://your-api-id.execute-api.us-east-1.amazonaws.com/Prod'
}
```
3. Push changes to trigger Amplify rebuild

---

### **Option 2: Vercel + AWS Lambda (Alternative)**
**Time**: 7 minutes | **Cost**: $0-5/month | **Difficulty**: ⭐ Easy

#### Step 1: Deploy Frontend to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel

# Follow prompts and deploy
```

#### Step 2: Deploy Backend to AWS Lambda
```bash
# Same as Option 1 Step 3
./deploy-scripts/deploy-lambda.sh --guided
```

#### Step 3: Update Environment Variables
1. In Vercel dashboard, go to your project settings
2. Add environment variable:
   - `REACT_APP_API_URL`: Your Lambda API Gateway URL

---

### **Option 3: Traditional Server (DigitalOcean/AWS EC2)**
**Time**: 15 minutes | **Cost**: $5-20/month | **Difficulty**: ⭐⭐ Medium

#### Step 1: Create Server
1. Create a droplet on [DigitalOcean](https://digitalocean.com) or EC2 instance
2. Choose Ubuntu 20.04 LTS
3. SSH into your server

#### Step 2: Setup Server
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js, Python, and Nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs python3 python3-pip nginx git

# Clone your repository
git clone https://github.com/yourusername/dressme-ai.git
cd dressme-ai
```

#### Step 3: Setup Backend
```bash
cd backend
pip3 install -r requirements.txt
pip3 install gunicorn

# Create systemd service
sudo tee /etc/systemd/system/dressme-api.service > /dev/null <<EOF
[Unit]
Description=DressMe AI API
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/dressme-ai/backend
Environment=PATH=/home/ubuntu/.local/bin
ExecStart=/home/ubuntu/.local/bin/gunicorn --bind 127.0.0.1:5000 app:app
Restart=always

[Install]
WantedBy=multi-user.target
EOF

# Start backend service
sudo systemctl enable dressme-api
sudo systemctl start dressme-api
```

#### Step 4: Setup Frontend
```bash
cd ../frontend

# Update API URL in src/config.js to point to your server
# Then build
npm install
npm run build

# Copy to nginx directory
sudo cp -r build/* /var/www/html/
```

#### Step 5: Configure Nginx
```bash
sudo tee /etc/nginx/sites-available/dressme > /dev/null <<EOF
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /var/www/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
    
    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/dressme /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🚀 **Fastest Option: One-Click Deployment**

### **Deploy to Railway (Recommended for Ultra-Quick Setup)**
1. Fork the repository on GitHub
2. Go to [Railway.app](https://railway.app)
3. Connect GitHub and select your forked repo
4. Railway will auto-deploy both frontend and backend!
5. Get your URLs and update the frontend config

### **Deploy to Render**
1. Go to [Render.com](https://render.com)
2. Connect GitHub repository
3. Create two services:
   - **Web Service** for backend (Python)
   - **Static Site** for frontend (React)
4. Configure environment variables

---

## 🐳 **Docker Deployment (Any Platform)**

### Quick Docker Setup
```bash
# Build images
docker build -t dressme-backend backend/
docker build -t dressme-frontend frontend/

# Run with docker-compose
docker-compose up -d
```

### Docker Compose File
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend
```

---

## 📱 **Mobile/PWA Deployment**

### Make it a Progressive Web App
1. The app is already PWA-ready!
2. Users can "Add to Home Screen" on mobile
3. Works offline with service workers

---

## 🔧 **Environment Variables**

### Frontend (.env)
```bash
REACT_APP_API_URL=https://your-api-url.com
REACT_APP_ENV=production
```

### Backend (.env)
```bash
FLASK_ENV=production
CORS_ORIGINS=https://your-frontend-url.com
```

---

## 🛠️ **Troubleshooting**

### Common Issues:
1. **CORS Errors**: Update CORS_ORIGINS in backend
2. **API Not Found**: Check API URL in frontend config
3. **Build Failures**: Ensure Node.js version compatibility
4. **Python Errors**: Check Python version (3.8+)

### Quick Fixes:
```bash
# Check if services are running
sudo systemctl status dressme-api
sudo systemctl status nginx

# View logs
sudo journalctl -u dressme-api -f
sudo tail -f /var/log/nginx/error.log

# Restart services
sudo systemctl restart dressme-api
sudo systemctl restart nginx
```

---

## 💰 **Cost Comparison**

| Platform | Frontend | Backend | Total/Month |
|----------|----------|---------|-------------|
| **Amplify + Lambda** | $1-5 | $0-2 | $1-7 |
| **Vercel + Lambda** | $0-20 | $0-2 | $0-22 |
| **Railway** | $0-10 | $0-10 | $0-20 |
| **DigitalOcean** | $0 | $5-20 | $5-20 |
| **AWS EC2** | $0 | $8-50 | $8-50 |

---

## 🎯 **My Recommendation**

**For most users**: Start with **AWS Amplify + Lambda** (Option 1)
- Easiest setup
- Auto-scaling
- Very cost-effective
- Professional infrastructure

**For developers**: Use **Railway** or **Render**
- One-click deployment
- Git-based deployments
- Good free tiers

**For production**: Use **AWS EC2** or **DigitalOcean**
- Full control
- Custom domains
- SSL certificates
- Better performance

---

## 📞 **Need Help?**

1. Check the detailed `AWS_DEPLOYMENT_GUIDE.md`
2. Use the automated scripts in `deploy-scripts/`
3. Test locally first with `./run.sh`
4. Join the community or create an issue on GitHub

**Happy deploying!** 🚀