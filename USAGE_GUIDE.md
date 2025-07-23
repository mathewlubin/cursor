# StyleMood AI - Quick Usage Guide 🌟

## 🚀 Getting Started

### Option 1: One-Click Setup (Recommended)
```bash
./run.sh
```
This will automatically:
- Install all dependencies
- Start both backend and frontend servers
- Open the application in your browser

### Option 2: Manual Setup
```bash
# Backend
cd backend
pip3 install --break-system-packages -r requirements.txt
python3 app.py &

# Frontend (in new terminal)
cd frontend
npm install
npm start
```

## 🎨 How to Use

1. **Visit the Application**: http://localhost:3000

2. **Select Your Mood**: Choose from 7 emotions
   - Happy, Confident, Romantic, Relaxed
   - Elegant, Playful, Professional

3. **Pick Weather**: Select current conditions
   - Sunny, Rainy, Cloudy, Cold

4. **Choose Region**: Select your climate
   - Tropical, Temperate, Cold, Desert

5. **Select Color**: Pick your preferred color
   - 10 colors available with psychological meanings

6. **Get Recommendations**: Click "Get My Style Recommendations"

## 📱 Features

### Complete Outfit Suggestions
- **Tops**: Shirts, blouses, sweaters, blazers
- **Bottoms**: Pants, skirts, dresses, shorts
- **Outerwear**: Jackets, coats, cardigans
- **Accessories**: Shoes, bags, jewelry, hats

### Smart Recommendations
- **Emotion-based styling** that matches your mood
- **Weather-appropriate** choices for comfort
- **Regional climate** considerations for practicality
- **Color psychology** for optimal impact

### Detailed Guidance
- **Styling tips** for each outfit
- **Fabric recommendations** based on region
- **Fit guidance** based on emotion
- **Confidence scores** for each suggestion

## 🎮 Demo Mode

Try the interactive demo without the UI:
```bash
# Interactive demo with user input
python3 demo.py

# Sample automated requests
python3 demo.py --sample
```

## 🔧 API Usage

The backend provides RESTful APIs:

### Get Recommendations
```bash
curl -X POST http://localhost:5000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"emotion":"confident","weather":"sunny","region":"temperate","color":"navy"}'
```

### Get Available Options
```bash
curl http://localhost:5000/api/emotions    # Available emotions
curl http://localhost:5000/api/colors      # Available colors
curl http://localhost:5000/api/weather-options  # Weather options
curl http://localhost:5000/api/regions     # Regional climates
```

## 💡 Tips for Best Results

### Emotion Selection
- **Professional/Confident**: For work and formal events
- **Happy/Playful**: For social gatherings and fun activities
- **Romantic**: For dates and special occasions
- **Relaxed**: For casual, comfortable everyday wear

### Weather Considerations
- **Sunny**: Light, breathable fabrics and sun protection
- **Rainy**: Waterproof and quick-dry materials
- **Cloudy**: Versatile layering options
- **Cold**: Warm, insulating materials and layers

### Regional Adaptation
- **Tropical**: Light fabrics, UV protection, loose fits
- **Temperate**: Versatile pieces, seasonal adaptability
- **Cold**: Insulation, windproof, waterproof materials
- **Desert**: Light colors, breathable fabrics, sun protection

### Color Psychology
- **Red**: Bold, passionate, confident energy
- **Blue**: Calm, trustworthy, professional
- **Black**: Elegant, sophisticated, powerful
- **White**: Clean, minimalist, fresh
- **Green**: Natural, balanced, harmonious

## 🛠️ Troubleshooting

### Backend Issues
```bash
# Check if backend is running
curl http://localhost:5000/health

# View backend logs
tail -f backend/backend.log

# Restart backend
cd backend && python3 app.py
```

### Frontend Issues
```bash
# Clear npm cache
cd frontend && npm cache clean --force

# Reinstall dependencies
rm -rf node_modules && npm install

# Check for port conflicts
lsof -i :3000
```

### Common Issues
- **Port 5000 busy**: Backend may already be running
- **Port 3000 busy**: Frontend may already be running
- **Module not found**: Run dependency installation again
- **Connection refused**: Ensure backend is running before frontend

## 📞 Support

For issues or questions:
1. Check this usage guide
2. Run `python3 demo.py --sample` to test backend
3. Check browser console for frontend errors
4. Refer to the main README.md for detailed information

---

**StyleMood AI** - Your intelligent outfit companion! ✨👗🎨