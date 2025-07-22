# DressMe AI - Smart Dress Recommendation Webapp

An intelligent dress recommendation system that suggests outfits based on your emotions, weather conditions, region, and color preferences. Built with React, Tailwind CSS, and Python Flask.

![DressMe AI](https://img.shields.io/badge/DressMe-AI-pink?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square)
![Python](https://img.shields.io/badge/Python-Flask-green?style=flat-square)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square)

## 🌟 Features

- **Emotion-Based Recommendations**: Get dress suggestions based on how you're feeling
- **Weather-Aware Suggestions**: Recommendations that match current weather conditions
- **Regional Preferences**: Styling tips based on your geographical location
- **Color Psychology**: Choose colors that match your mood and preferences
- **Beautiful UI**: Modern, responsive design with glassmorphism effects
- **Real-time Recommendations**: Instant AI-powered suggestions

## 🎯 How It Works

1. **Select Your Emotion**: Choose from happy, confident, romantic, relaxed, elegant, playful, or professional
2. **Weather Conditions**: Pick sunny, rainy, cloudy, or cold weather
3. **Your Region**: Select from tropical, temperate, cold, or desert climates
4. **Color Preference**: Choose your preferred color from a visual color palette
5. **Get Recommendations**: Receive 3 personalized dress suggestions with styling tips

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dress-recommendation-webapp
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
   The backend will run on `http://localhost:5000`

3. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The frontend will run on `http://localhost:3000`

### Development Setup

For development, you'll need both servers running:

**Terminal 1 (Backend):**
```bash
cd backend
python app.py
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm start
```

## 🏗️ Project Structure

```
dress-recommendation-webapp/
├── backend/                 # Python Flask API
│   ├── app.py              # Main Flask application
│   └── requirements.txt    # Python dependencies
├── frontend/               # React application
│   ├── public/            # Static files
│   ├── src/               # React components
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # App styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles with Tailwind
│   ├── package.json       # Node dependencies
│   ├── tailwind.config.js # Tailwind configuration
│   └── postcss.config.js  # PostCSS configuration
└── README.md              # This file
```

## 🎨 Technology Stack

### Frontend
- **React 18.2.0**: Modern React with hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API calls

### Backend
- **Flask**: Lightweight Python web framework
- **Flask-CORS**: Cross-origin resource sharing
- **Python**: Core recommendation logic

## 🧠 Recommendation Algorithm

The app uses a multi-factor recommendation system:

1. **Emotion Mapping**: Maps emotions to dress categories (casual, formal, party)
2. **Weather Matching**: Selects appropriate styles for weather conditions
3. **Regional Adaptation**: Considers climate and cultural preferences
4. **Color Psychology**: Incorporates color mood associations
5. **Confidence Scoring**: Provides confidence ratings for each recommendation

## 🎨 UI/UX Features

- **Glassmorphism Design**: Modern glass-like transparent elements
- **Gradient Backgrounds**: Beautiful color gradients
- **Hover Effects**: Interactive card animations
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Color Picker**: Visual color selection interface
- **Loading States**: Smooth loading animations

## 📱 API Endpoints

- `POST /api/recommend`: Get dress recommendations
- `GET /api/colors`: Get available colors
- `GET /api/emotions`: Get available emotions
- `GET /health`: Health check endpoint

## 🔧 Customization

### Adding New Emotions
Edit the `EMOTION_STYLES` dictionary in `backend/app.py`:

```python
EMOTION_STYLES = {
    'your_emotion': 'description of style',
    # ... existing emotions
}
```

### Adding New Weather Types
Update the `DRESS_DATA` structure in `backend/app.py`:

```python
DRESS_DATA = {
    'category': {
        'your_weather': ['dress1', 'dress2', 'dress3'],
        # ... existing weather types
    }
}
```

## 🌈 Color Options

The app supports these colors:
- Red, Blue, Green, Yellow, Purple
- Pink, Black, White, Orange, Brown

Each color has associated mood descriptions that influence recommendations.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Color gradients inspired by modern design trends
- Recommendation logic based on fashion psychology research

## 📧 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**Built with ❤️ for fashion enthusiasts who want AI-powered styling assistance**
