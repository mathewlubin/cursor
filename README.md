# StyleMood AI - Intelligent Outfit Recommender 🌟

A lightweight, intelligent outfit recommendation system that provides personalized clothing suggestions based on user emotions, weather conditions, regional climate, and color preferences. Built with Python (Flask), React, and Tailwind CSS.

![StyleMood AI](https://img.shields.io/badge/StyleMood-AI%20Powered-blueviolet?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=flat-square)
![React](https://img.shields.io/badge/React-18.2+-61DAFB?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square)

## ✨ Features

### 🎯 Smart Recommendations
- **Complete outfit suggestions** including tops, bottoms, outerwear, and accessories
- **Emotion-based styling** that matches your current mood and personality
- **Weather-appropriate choices** for any climate condition
- **Regional climate adaptation** for tropical, temperate, cold, and desert regions
- **Color psychology integration** for optimal emotional and social impact

### 🧠 AI-Powered Logic
- **Emotion mapping** to clothing styles and fits
- **Weather compatibility** analysis for comfort and appropriateness
- **Regional fabric recommendations** based on local climate conditions
- **Color mood analysis** for psychological impact and occasion suitability
- **Comprehensive styling tips** for each recommendation

### 🎨 Modern Interface
- **Beautiful gradient UI** with smooth animations
- **Interactive color picker** with visual feedback
- **Responsive design** for desktop and mobile
- **Real-time recommendations** with confidence scores
- **User profile tracking** for personalized experience

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stylemood-ai
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd frontend
   npm install
   ```

4. **Run the application**
   ```bash
   # Start backend (in backend directory)
   python app.py
   
   # Start frontend (in frontend directory)
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Using the Run Script

For convenience, use the provided run script:
```bash
chmod +x run.sh
./run.sh
```

## 🎮 Demo

Try the interactive demo to see the recommendation engine in action:

```bash
# Interactive demo
python demo.py

# Run sample requests
python demo.py --sample
```

## 📖 How It Works

### 1. User Input Collection
The system collects four key parameters:
- **Emotion**: happy, confident, romantic, relaxed, elegant, playful, professional
- **Weather**: sunny, rainy, cloudy, cold
- **Region**: tropical, temperate, cold, desert
- **Color**: red, blue, green, yellow, purple, pink, black, white, orange, brown

### 2. AI Processing Engine
```python
# Emotion → Style Mapping
emotion_styles = {
    'confident': {
        'style': 'bold and structured',
        'colors': ['red', 'black', 'navy'],
        'fit': 'tailored and fitted'
    }
}

# Weather → Clothing Mapping
outfit_data = {
    'tops': {
        'formal': {
            'sunny': ['silk blouse', 'blazer'],
            'cold': ['cashmere sweater', 'wool blazer']
        }
    }
}
```

### 3. Recommendation Generation
- **Outfit Assembly**: Combines top, bottom, outerwear, and accessories
- **Style Coherence**: Ensures all pieces match the selected emotion and occasion
- **Weather Appropriateness**: Considers comfort and practicality
- **Regional Adaptation**: Recommends suitable fabrics and fits
- **Confidence Scoring**: Provides reliability metrics for each suggestion

## 🏗️ Architecture

### Backend (Flask + Python)
```
backend/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
└── Dockerfile         # Container configuration
```

**Key Components:**
- **Recommendation Engine**: Core logic for outfit generation
- **API Endpoints**: RESTful services for frontend communication
- **Data Models**: Structured outfit and style databases
- **Logic Processors**: Emotion, weather, and regional analysis

### Frontend (React + Tailwind CSS)
```
frontend/src/
├── App.js             # Main React component
├── App.css            # Custom styling and animations
├── config.js          # API configuration
└── index.js           # Application entry point
```

**Key Features:**
- **Interactive UI Components**: Dynamic selection buttons and color picker
- **Real-time API Integration**: Seamless backend communication
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Smooth Animations**: Enhanced user experience with CSS transitions

## 🔧 API Reference

### Get Outfit Recommendations
```http
POST /api/recommend
Content-Type: application/json

{
  "emotion": "confident",
  "weather": "sunny",
  "region": "temperate",
  "color": "navy"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "id": 1,
      "outfit": {
        "top": "silk blouse",
        "bottom": "dress pants",
        "outerwear": "light blazer",
        "accessories": ["sunglasses", "watch", "heels"],
        "styling_tips": ["Choose tailored fits...", "..."],
        "fabric_recommendations": ["cotton", "wool blends"],
        "color_palette": ["red", "black", "navy"],
        "fit_guide": "tailored and fitted"
      },
      "style_description": "bold and structured",
      "confidence_score": 94,
      "occasion_suitability": "professional settings"
    }
  ],
  "user_profile": {...},
  "general_tips": [...]
}
```

### Available Options
- `GET /api/colors` - Available color options
- `GET /api/emotions` - Available emotion options
- `GET /api/weather-options` - Weather conditions
- `GET /api/regions` - Regional climates

## 🎨 Customization

### Adding New Emotions
```python
EMOTION_STYLES = {
    'adventurous': {
        'style': 'bold and practical',
        'colors': ['olive', 'khaki', 'brown'],
        'patterns': ['camouflage', 'stripes'],
        'fit': 'comfortable and functional'
    }
}
```

### Extending Weather Conditions
```python
OUTFIT_DATA = {
    'tops': {
        'casual': {
            'foggy': ['light sweater', 'hoodie'],
            'windy': ['windbreaker', 'fitted top']
        }
    }
}
```

### Regional Customization
```python
REGIONAL_CLIMATE = {
    'mediterranean': {
        'fabrics': ['linen', 'cotton', 'light wool'],
        'colors': ['earth tones', 'ocean blues'],
        'considerations': ['breathability', 'sun protection']
    }
}
```

## 🚀 Deployment

### Local Development
1. Follow the Quick Start guide above
2. Both services will run with hot-reload enabled

### Production Deployment
The application includes Docker configurations and AWS deployment scripts:

```bash
# Build and deploy using the provided scripts
./deploy-scripts/build.sh
./deploy-scripts/deploy.sh
```

See `AWS_DEPLOYMENT_GUIDE.md` for detailed production deployment instructions.

## 🧪 Testing

### Backend Testing
```bash
cd backend
python -m pytest tests/
```

### Frontend Testing
```bash
cd frontend
npm test
```

### Integration Testing
```bash
# Run the demo script to test end-to-end functionality
python demo.py --sample
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint for JavaScript code
- Write tests for new features
- Update documentation for API changes

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Color Psychology Research** for emotion-color mapping
- **Fashion Industry Standards** for styling guidelines
- **Climate Data** for regional recommendations
- **Open Source Community** for tools and libraries

## 📞 Support

For questions, suggestions, or issues:
- Open an issue on GitHub
- Check the documentation
- Run the demo script for examples

---

**StyleMood AI** - Where technology meets fashion to create your perfect style! ✨👗🎨
