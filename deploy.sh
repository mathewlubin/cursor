#!/bin/bash

echo "🚀 DressMe AI - Universal Deployment Script"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    print_info "Checking prerequisites..."
    
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3 first."
        exit 1
    fi
    
    print_status "All prerequisites are installed!"
}

# Test local deployment
test_local() {
    print_info "Testing local deployment..."
    
    if [ ! -f "run.sh" ]; then
        print_error "run.sh not found. Are you in the correct directory?"
        exit 1
    fi
    
    chmod +x run.sh
    print_status "Local test setup complete. Run './run.sh' to test locally."
}

# Deploy to Docker
deploy_docker() {
    print_info "Deploying with Docker..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        return 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install Docker Compose first."
        return 1
    fi
    
    print_info "Building and starting containers..."
    docker-compose up --build -d
    
    print_status "Docker deployment complete!"
    print_info "Frontend: http://localhost"
    print_info "Backend: http://localhost:5000"
    print_info "Use 'docker-compose logs -f' to view logs"
    print_info "Use 'docker-compose down' to stop"
}

# Deploy to Railway
deploy_railway() {
    print_info "Setting up Railway deployment..."
    
    if ! command -v railway &> /dev/null; then
        print_warning "Railway CLI not found. Installing..."
        npm install -g @railway/cli
    fi
    
    print_info "Please follow these steps:"
    echo "1. Go to https://railway.app"
    echo "2. Sign up/Login with GitHub"
    echo "3. Create a new project from GitHub repo"
    echo "4. Railway will auto-deploy both services!"
    echo "5. Update frontend environment variables with backend URL"
    
    print_status "Railway setup guide displayed!"
}

# Deploy to Vercel
deploy_vercel() {
    print_info "Setting up Vercel deployment..."
    
    if ! command -v vercel &> /dev/null; then
        print_warning "Vercel CLI not found. Installing..."
        npm install -g vercel
    fi
    
    print_info "Deploying frontend to Vercel..."
    cd frontend
    vercel --prod
    cd ..
    
    print_warning "Don't forget to:"
    echo "1. Deploy backend to AWS Lambda using: ./deploy-scripts/deploy-lambda.sh"
    echo "2. Update Vercel environment variables with your API URL"
    
    print_status "Vercel deployment initiated!"
}

# Deploy to Netlify
deploy_netlify() {
    print_info "Setting up Netlify deployment..."
    
    if ! command -v netlify &> /dev/null; then
        print_warning "Netlify CLI not found. Installing..."
        npm install -g netlify-cli
    fi
    
    print_info "Building and deploying frontend to Netlify..."
    cd frontend
    npm install
    npm run build
    netlify deploy --prod --dir=build
    cd ..
    
    print_warning "Don't forget to:"
    echo "1. Deploy backend to AWS Lambda using: ./deploy-scripts/deploy-lambda.sh"
    echo "2. Update Netlify environment variables with your API URL"
    
    print_status "Netlify deployment complete!"
}

# Deploy to AWS
deploy_aws() {
    print_info "Setting up AWS deployment..."
    
    if ! command -v aws &> /dev/null; then
        print_error "AWS CLI is not installed. Please install and configure AWS CLI first."
        return 1
    fi
    
    if ! aws sts get-caller-identity &> /dev/null; then
        print_error "AWS CLI is not configured. Please run 'aws configure' first."
        return 1
    fi
    
    print_info "Choose AWS deployment option:"
    echo "1. Lambda + S3 (Serverless - Recommended)"
    echo "2. EC2 + S3 (Traditional)"
    echo "3. Amplify (Easiest)"
    
    read -p "Enter choice (1-3): " aws_choice
    
    case $aws_choice in
        1)
            if [ -f "deploy-scripts/deploy-lambda.sh" ]; then
                chmod +x deploy-scripts/deploy-lambda.sh
                ./deploy-scripts/deploy-lambda.sh --guided
            else
                print_error "Lambda deployment script not found!"
            fi
            ;;
        2)
            print_info "Please refer to AWS_DEPLOYMENT_GUIDE.md for EC2 setup instructions."
            ;;
        3)
            print_info "Please follow these steps:"
            echo "1. Push code to GitHub"
            echo "2. Go to AWS Amplify Console"
            echo "3. Connect GitHub repo and deploy frontend"
            echo "4. Deploy backend using option 1 above"
            ;;
        *)
            print_error "Invalid choice!"
            ;;
    esac
}

# Main menu
show_menu() {
    echo ""
    print_info "Choose deployment option:"
    echo "1. 🧪 Test locally first (Recommended)"
    echo "2. 🐳 Deploy with Docker (Local/Server)"
    echo "3. 🚂 Deploy to Railway (Easiest)"
    echo "4. ▲ Deploy to Vercel (Frontend only)"
    echo "5. 🌐 Deploy to Netlify (Frontend only)"
    echo "6. ☁️  Deploy to AWS (Full stack)"
    echo "7. 📚 Show deployment guides"
    echo "8. ❌ Exit"
    echo ""
}

# Show guides
show_guides() {
    print_info "Available deployment guides:"
    echo "📖 DEPLOY_INSTRUCTIONS.md - Step-by-step instructions"
    echo "📖 AWS_DEPLOYMENT_GUIDE.md - Comprehensive AWS guide"
    echo "📖 QUICK_DEPLOY.md - Quick deployment summary"
    echo "📖 README.md - Project overview and setup"
    echo ""
    print_info "Automated scripts in deploy-scripts/:"
    echo "🔧 deploy-lambda.sh - AWS Lambda deployment"
    echo "🔧 deploy-s3.sh - S3 static hosting"
    echo ""
}

# Main execution
main() {
    check_prerequisites
    
    while true; do
        show_menu
        read -p "Enter your choice (1-8): " choice
        
        case $choice in
            1)
                test_local
                ;;
            2)
                deploy_docker
                ;;
            3)
                deploy_railway
                ;;
            4)
                deploy_vercel
                ;;
            5)
                deploy_netlify
                ;;
            6)
                deploy_aws
                ;;
            7)
                show_guides
                ;;
            8)
                print_status "Thanks for using DressMe AI deployment script!"
                exit 0
                ;;
            *)
                print_error "Invalid choice! Please enter 1-8."
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
    done
}

# Run main function
main