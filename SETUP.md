# DressMe AI - Quick Setup Guide

## 🚀 Easy Setup

### Option 1: Automated Setup (Recommended)
```bash
chmod +x run.sh
./run.sh --setup
```

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
pip3 install --break-system-packages -r requirements.txt
python3 app.py
```

#### Frontend Setup (in a new terminal)
```bash
cd frontend
npm install
npm start
```

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 🎯 How to Use

1. Select your current emotion (happy, confident, romantic, etc.)
2. Choose the weather conditions (sunny, rainy, cloudy, cold)
3. Pick your region type (tropical, temperate, cold, desert)
4. Select your preferred color from the color palette
5. Click "Get My Recommendations" to receive personalized dress suggestions

## 🔧 Features

- **Smart Recommendations**: AI-powered dress suggestions based on multiple factors
- **Beautiful UI**: Modern glassmorphism design with gradient backgrounds
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time API**: Instant recommendations with confidence scores

## 📱 API Testing

Test the backend API directly:

```bash
# Get available colors
curl http://localhost:5000/api/colors

# Get available emotions  
curl http://localhost:5000/api/emotions

# Get recommendations
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"emotion":"happy","weather":"sunny","region":"tropical","color":"blue"}'
```

## 🛠️ Troubleshooting

- **Python errors**: Make sure you have Python 3.8+ installed
- **Node.js errors**: Make sure you have Node.js 14+ and npm installed
- **Port conflicts**: Make sure ports 3000 and 5000 are available
- **CORS issues**: The backend includes CORS support for localhost

## 🎨 Customization

You can easily customize the app by:
- Adding new emotions in `backend/app.py`
- Adding new weather types or dress categories
- Modifying the UI colors in `frontend/tailwind.config.js`
- Adding new recommendation logic in the Flask backend