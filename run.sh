#!/bin/bash

# StyleMood AI - Outfit Recommender Setup and Run Script
# =====================================================

echo "🌟 Welcome to StyleMood AI - Intelligent Outfit Recommender! 🌟"
echo ""

# Check if Python3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 is required but not installed. Please install Python 3.8+."
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is required but not installed. Please install Node.js 16+."
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "❌ npm is required but not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed!"
echo ""

# Setup Backend
echo "🐍 Setting up Backend..."
cd backend

# Install Python dependencies
echo "Installing Python dependencies..."
if pip3 install --break-system-packages -r requirements.txt > /dev/null 2>&1; then
    echo "✅ Backend dependencies installed successfully!"
else
    echo "⚠️  Warning: Some backend dependencies might already be installed."
fi

# Test backend
echo "Testing backend..."
if python3 -c "import app; print('Backend test successful!')" > /dev/null 2>&1; then
    echo "✅ Backend is ready!"
else
    echo "❌ Backend test failed. Please check the installation."
    exit 1
fi

cd ..

# Setup Frontend
echo ""
echo "⚛️  Setting up Frontend..."
cd frontend

# Install npm dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    if npm install > /dev/null 2>&1; then
        echo "✅ Frontend dependencies installed successfully!"
    else
        echo "❌ Frontend dependencies installation failed."
        exit 1
    fi
else
    echo "✅ Frontend dependencies already installed!"
fi

cd ..

# Start the application
echo ""
echo "🚀 Starting StyleMood AI Application..."
echo ""
echo "📍 Application URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo ""
echo "🎨 Features:"
echo "   • Complete outfit recommendations (tops, bottoms, outerwear, accessories)"
echo "   • Emotion-based styling suggestions"
echo "   • Weather-appropriate clothing choices"
echo "   • Regional climate considerations"
echo "   • Color psychology integration"
echo ""
echo "💡 Usage:"
echo "   1. Select your current emotion"
echo "   2. Choose the weather conditions"
echo "   3. Pick your region/climate"
echo "   4. Select your preferred color"
echo "   5. Get personalized outfit recommendations!"
echo ""

# Function to cleanup background processes
cleanup() {
    echo ""
    echo "🛑 Shutting down StyleMood AI..."
    pkill -f "python3.*app.py"
    pkill -f "npm.*start"
    echo "👋 Thank you for using StyleMood AI!"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Start backend in background
echo "Starting backend server..."
cd backend
python3 app.py > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Check if backend is running
if curl -s http://localhost:5000/health > /dev/null 2>&1; then
    echo "✅ Backend server started successfully!"
else
    echo "⚠️  Backend server may still be starting..."
fi

# Start frontend
echo "Starting frontend server..."
cd frontend
echo ""
echo "🎨 Opening StyleMood AI in your browser..."
echo "   If it doesn't open automatically, visit: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

# Start frontend (this will block)
npm start

# Cleanup when npm start exits
cleanup