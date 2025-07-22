from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Dress recommendation data
DRESS_DATA = {
    'casual': {
        'sunny': ['sundress', 'maxi dress', 'shirt dress', 'wrap dress'],
        'rainy': ['sweater dress', 'midi dress with jacket', 'long sleeve dress'],
        'cloudy': ['casual dress', 'skater dress', 'fit and flare dress'],
        'cold': ['sweater dress', 'long sleeve dress', 'turtle neck dress']
    },
    'formal': {
        'sunny': ['cocktail dress', 'evening gown', 'elegant midi dress'],
        'rainy': ['formal dress with blazer', 'sophisticated long dress'],
        'cloudy': ['business dress', 'professional midi dress', 'elegant sheath dress'],
        'cold': ['formal long sleeve dress', 'wool dress', 'structured dress']
    },
    'party': {
        'sunny': ['bodycon dress', 'mini dress', 'bright colored dress'],
        'rainy': ['sequin dress', 'party dress with cardigan'],
        'cloudy': ['stylish midi dress', 'trendy dress'],
        'cold': ['party dress with coat', 'velvet dress', 'warm party outfit']
    }
}

EMOTION_STYLES = {
    'happy': 'bright and vibrant',
    'confident': 'bold and structured', 
    'romantic': 'flowy and feminine',
    'relaxed': 'comfortable and casual',
    'elegant': 'sophisticated and refined',
    'playful': 'fun and colorful',
    'professional': 'structured and polished'
}

REGIONAL_PREFERENCES = {
    'tropical': ['light fabrics', 'bright colors', 'breathable materials'],
    'temperate': ['versatile pieces', 'layering options', 'seasonal colors'],
    'cold': ['warm materials', 'layered looks', 'darker colors'],
    'desert': ['light colors', 'loose fitting', 'sun protection']
}

COLOR_MOODS = {
    'red': 'passionate and bold',
    'blue': 'calm and trustworthy',
    'green': 'natural and harmonious',
    'yellow': 'cheerful and energetic',
    'purple': 'creative and luxurious',
    'pink': 'romantic and feminine',
    'black': 'elegant and sophisticated',
    'white': 'pure and minimalist',
    'orange': 'vibrant and enthusiastic',
    'brown': 'earthy and stable'
}

@app.route('/api/recommend', methods=['POST'])
def recommend_dress():
    data = request.json
    
    emotion = data.get('emotion', '').lower()
    weather = data.get('weather', '').lower()
    region = data.get('region', '').lower()
    color = data.get('color', '').lower()
    
    # Determine dress category based on emotion
    if emotion in ['professional', 'confident', 'elegant']:
        category = 'formal'
    elif emotion in ['happy', 'playful']:
        category = 'party'
    else:
        category = 'casual'
    
    # Get base dress suggestions
    dress_options = DRESS_DATA.get(category, {}).get(weather, ['classic dress'])
    
    # Create personalized recommendations
    recommendations = []
    for i, dress in enumerate(dress_options[:3]):  # Top 3 recommendations
        recommendation = {
            'id': i + 1,
            'name': dress.title(),
            'category': category,
            'style': EMOTION_STYLES.get(emotion, 'versatile'),
            'color_mood': COLOR_MOODS.get(color, 'versatile'),
            'regional_tip': ', '.join(REGIONAL_PREFERENCES.get(region, ['classic style'])),
            'weather_appropriate': weather,
            'confidence_score': random.randint(85, 98),
            'description': f"A {EMOTION_STYLES.get(emotion, 'versatile')} {dress} perfect for {weather} weather in {color} color."
        }
        recommendations.append(recommendation)
    
    return jsonify({
        'recommendations': recommendations,
        'user_profile': {
            'emotion': emotion,
            'weather': weather,
            'region': region,
            'color': color
        }
    })

@app.route('/api/colors', methods=['GET'])
def get_colors():
    return jsonify(list(COLOR_MOODS.keys()))

@app.route('/api/emotions', methods=['GET'])
def get_emotions():
    return jsonify(list(EMOTION_STYLES.keys()))

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)