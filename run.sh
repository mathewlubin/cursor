#!/bin/bash

echo "🚀 Starting DressMe AI Webapp..."

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "🔍 Checking prerequisites..."

if ! command_exists python3; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

if ! command_exists node; then
    echo "❌ Node.js is not installed. Please install Node.js 14 or higher."
    exit 1
fi

if ! command_exists npm; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Function to install backend dependencies
setup_backend() {
    echo "🐍 Setting up Python backend..."
    cd backend
    
    if [ ! -d "venv" ]; then
        echo "📦 Creating virtual environment..."
        python3 -m venv venv
    fi
    
    echo "🔧 Activating virtual environment..."
    source venv/bin/activate
    
    echo "📥 Installing Python dependencies..."
    pip install -r requirements.txt
    
    cd ..
}

# Function to install frontend dependencies
setup_frontend() {
    echo "⚛️ Setting up React frontend..."
    cd frontend
    
    if [ ! -d "node_modules" ]; then
        echo "📥 Installing Node.js dependencies..."
        npm install
    fi
    
    cd ..
}

# Function to start the backend
start_backend() {
    echo "🚀 Starting Flask backend..."
    cd backend
    source venv/bin/activate
    python app.py &
    BACKEND_PID=$!
    echo "Backend started with PID: $BACKEND_PID"
    cd ..
}

# Function to start the frontend
start_frontend() {
    echo "🚀 Starting React frontend..."
    cd frontend
    npm start &
    FRONTEND_PID=$!
    echo "Frontend started with PID: $FRONTEND_PID"
    cd ..
}

# Cleanup function
cleanup() {
    echo "🛑 Shutting down servers..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
        echo "Backend stopped"
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
        echo "Frontend stopped"
    fi
    exit 0
}

# Trap signals to cleanup when script is terminated
trap cleanup SIGINT SIGTERM

# Check if we need to set up dependencies
if [ "$1" = "--setup" ] || [ ! -d "backend/venv" ] || [ ! -d "frontend/node_modules" ]; then
    setup_backend
    setup_frontend
fi

# Start both servers
start_backend
sleep 3  # Give backend time to start
start_frontend

echo ""
echo "🎉 DressMe AI is now running!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for background processes
wait