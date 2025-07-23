from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import json

app = Flask(__name__)
CORS(app)

# Comprehensive outfit data
OUTFIT_DATA = {
    'tops': {
        'casual': {
            'sunny': ['cotton t-shirt', 'tank top', 'linen blouse', 'polo shirt', 'crop top'],
            'rainy': ['long-sleeve shirt', 'hoodie', 'sweater', 'cardigan'],
            'cloudy': ['lightweight sweater', 'button-up shirt', 'light jacket', 'v-neck top'],
            'cold': ['thick sweater', 'turtleneck', 'fleece pullover', 'wool cardigan']
        },
        'formal': {
            'sunny': ['silk blouse', 'dress shirt', 'elegant top', 'blazer'],
            'rainy': ['professional blouse', 'wool sweater', 'formal cardigan'],
            'cloudy': ['business shirt', 'tailored blouse', 'structured top'],
            'cold': ['cashmere sweater', 'wool blazer', 'formal turtleneck']
        },
        'party': {
            'sunny': ['sequin top', 'bodysuit', 'crop top', 'halter top'],
            'rainy': ['metallic blouse', 'dressy sweater', 'party top'],
            'cloudy': ['stylish blouse', 'trendy top', 'statement shirt'],
            'cold': ['velvet top', 'embellished sweater', 'party blazer']
        }
    },
    'bottoms': {
        'casual': {
            'sunny': ['denim shorts', 'cotton pants', 'maxi skirt', 'flowy dress'],
            'rainy': ['jeans', 'waterproof pants', 'midi skirt', 'casual dress'],
            'cloudy': ['chinos', 'casual trousers', 'knee-length skirt', 'midi dress'],
            'cold': ['thermal leggings', 'wool pants', 'long skirt', 'sweater dress']
        },
        'formal': {
            'sunny': ['dress pants', 'pencil skirt', 'cocktail dress', 'elegant midi dress'],
            'rainy': ['formal trousers', 'wool skirt', 'professional dress'],
            'cloudy': ['business pants', 'a-line skirt', 'work dress'],
            'cold': ['wool trousers', 'formal long skirt', 'business dress']
        },
        'party': {
            'sunny': ['mini skirt', 'party dress', 'dress shorts', 'bodycon dress'],
            'rainy': ['leather pants', 'party skirt', 'evening dress'],
            'cloudy': ['stylish pants', 'trendy skirt', 'cocktail dress'],
            'cold': ['velvet pants', 'warm party dress', 'formal evening wear']
        }
    },
    'outerwear': {
        'sunny': ['light cardigan', 'denim jacket', 'kimono', 'light blazer'],
        'rainy': ['raincoat', 'waterproof jacket', 'trench coat', 'umbrella'],
        'cloudy': ['light jacket', 'cardigan', 'windbreaker', 'bomber jacket'],
        'cold': ['winter coat', 'wool coat', 'puffer jacket', 'heavy sweater']
    },
    'accessories': {
        'sunny': ['sunglasses', 'sun hat', 'light scarf', 'sandals', 'canvas shoes'],
        'rainy': ['waterproof boots', 'umbrella', 'rain hat', 'waterproof bag'],
        'cloudy': ['light jacket', 'casual shoes', 'crossbody bag', 'simple jewelry'],
        'cold': ['warm scarf', 'beanie', 'gloves', 'boots', 'warm socks']
    }
}

EMOTION_STYLES = {
    'happy': {
        'style': 'bright and vibrant',
        'colors': ['yellow', 'orange', 'pink', 'bright blue'],
        'patterns': ['floral', 'polka dots', 'stripes'],
        'fit': 'comfortable and flowy'
    },
    'confident': {
        'style': 'bold and structured',
        'colors': ['red', 'black', 'navy', 'emerald'],
        'patterns': ['solid colors', 'geometric', 'minimal'],
        'fit': 'tailored and fitted'
    },
    'romantic': {
        'style': 'flowy and feminine',
        'colors': ['pink', 'lavender', 'cream', 'rose gold'],
        'patterns': ['floral', 'lace', 'soft prints'],
        'fit': 'flowing and soft'
    },
    'relaxed': {
        'style': 'comfortable and casual',
        'colors': ['beige', 'soft blue', 'mint', 'light gray'],
        'patterns': ['minimal', 'soft stripes', 'subtle prints'],
        'fit': 'loose and comfortable'
    },
    'elegant': {
        'style': 'sophisticated and refined',
        'colors': ['black', 'white', 'navy', 'burgundy'],
        'patterns': ['solid colors', 'subtle textures', 'classic prints'],
        'fit': 'classic and well-fitted'
    },
    'playful': {
        'style': 'fun and colorful',
        'colors': ['bright colors', 'rainbow', 'neon', 'pastels'],
        'patterns': ['bold prints', 'cartoon', 'quirky designs'],
        'fit': 'fun and expressive'
    },
    'professional': {
        'style': 'structured and polished',
        'colors': ['navy', 'gray', 'black', 'white'],
        'patterns': ['solid colors', 'pinstripes', 'subtle checks'],
        'fit': 'tailored and professional'
    }
}

REGIONAL_CLIMATE = {
    'tropical': {
        'fabrics': ['cotton', 'linen', 'bamboo', 'breathable synthetics'],
        'colors': ['light colors', 'pastels', 'bright tropical colors'],
        'considerations': ['UV protection', 'moisture-wicking', 'loose fit']
    },
    'temperate': {
        'fabrics': ['cotton', 'wool blends', 'denim', 'polyester'],
        'colors': ['versatile colors', 'seasonal appropriate'],
        'considerations': ['layering', 'versatility', 'weather adaptability']
    },
    'cold': {
        'fabrics': ['wool', 'fleece', 'thermal materials', 'down'],
        'colors': ['darker colors', 'earth tones', 'deep jewel tones'],
        'considerations': ['insulation', 'windproof', 'waterproof']
    },
    'desert': {
        'fabrics': ['light cotton', 'linen', 'UV protective fabrics'],
        'colors': ['light colors', 'earth tones', 'whites and creams'],
        'considerations': ['sun protection', 'breathability', 'dust resistance']
    }
}

COLOR_PSYCHOLOGY = {
    'red': {'mood': 'passionate and bold', 'energy': 'high', 'occasion': 'confident events'},
    'blue': {'mood': 'calm and trustworthy', 'energy': 'moderate', 'occasion': 'professional settings'},
    'green': {'mood': 'natural and harmonious', 'energy': 'balanced', 'occasion': 'casual outings'},
    'yellow': {'mood': 'cheerful and energetic', 'energy': 'high', 'occasion': 'social gatherings'},
    'purple': {'mood': 'creative and luxurious', 'energy': 'sophisticated', 'occasion': 'evening events'},
    'pink': {'mood': 'romantic and feminine', 'energy': 'soft', 'occasion': 'date nights'},
    'black': {'mood': 'elegant and sophisticated', 'energy': 'powerful', 'occasion': 'formal events'},
    'white': {'mood': 'pure and minimalist', 'energy': 'clean', 'occasion': 'summer days'},
    'orange': {'mood': 'vibrant and enthusiastic', 'energy': 'high', 'occasion': 'creative activities'},
    'brown': {'mood': 'earthy and stable', 'energy': 'grounded', 'occasion': 'outdoor activities'}
}

def get_outfit_category(emotion):
    """Determine outfit category based on emotion"""
    if emotion in ['professional', 'confident', 'elegant']:
        return 'formal'
    elif emotion in ['happy', 'playful']:
        return 'party'
    else:
        return 'casual'

def generate_complete_outfit(emotion, weather, region, color):
    """Generate a complete outfit recommendation"""
    category = get_outfit_category(emotion)
    emotion_data = EMOTION_STYLES.get(emotion, EMOTION_STYLES['relaxed'])
    regional_data = REGIONAL_CLIMATE.get(region, REGIONAL_CLIMATE['temperate'])
    color_data = COLOR_PSYCHOLOGY.get(color, COLOR_PSYCHOLOGY['blue'])
    
    # Select items for complete outfit
    top = random.choice(OUTFIT_DATA['tops'][category][weather])
    bottom = random.choice(OUTFIT_DATA['bottoms'][category][weather])
    outerwear = random.choice(OUTFIT_DATA['outerwear'][weather])
    accessories = random.sample(OUTFIT_DATA['accessories'][weather], min(3, len(OUTFIT_DATA['accessories'][weather])))
    
    # Create styling tips
    styling_tips = [
        f"Choose {emotion_data['fit']} fits to match your {emotion} mood",
        f"Incorporate {', '.join(regional_data['fabrics'][:2])} fabrics for your {region} climate",
        f"The {color} color will create a {color_data['mood']} impression",
        f"Perfect for {color_data['occasion']}"
    ]
    
    return {
        'top': top,
        'bottom': bottom,
        'outerwear': outerwear,
        'accessories': accessories,
        'styling_tips': styling_tips,
        'fabric_recommendations': regional_data['fabrics'],
        'color_palette': emotion_data['colors'],
        'fit_guide': emotion_data['fit']
    }

@app.route('/api/recommend', methods=['POST'])
def recommend_outfit():
    data = request.json
    
    emotion = data.get('emotion', '').lower()
    weather = data.get('weather', '').lower()
    region = data.get('region', '').lower()
    color = data.get('color', '').lower()
    
    # Validate inputs
    if not all([emotion, weather, region, color]):
        return jsonify({'error': 'All fields are required'}), 400
    
    # Generate multiple outfit recommendations
    recommendations = []
    for i in range(3):  # Generate 3 different outfit combinations
        outfit = generate_complete_outfit(emotion, weather, region, color)
        
        recommendation = {
            'id': i + 1,
            'outfit': outfit,
            'style_description': EMOTION_STYLES.get(emotion, {}).get('style', 'versatile'),
            'weather_compatibility': weather,
            'regional_adaptation': REGIONAL_CLIMATE.get(region, {}).get('considerations', []),
            'color_impact': COLOR_PSYCHOLOGY.get(color, {}).get('mood', 'neutral'),
            'confidence_score': random.randint(87, 98),
            'occasion_suitability': COLOR_PSYCHOLOGY.get(color, {}).get('occasion', 'general'),
            'comfort_level': 'high' if emotion in ['relaxed', 'casual'] else 'moderate'
        }
        recommendations.append(recommendation)
    
    return jsonify({
        'recommendations': recommendations,
        'user_profile': {
            'emotion': emotion,
            'weather': weather,
            'region': region,
            'color': color,
            'style_preference': EMOTION_STYLES.get(emotion, {}).get('style', 'versatile')
        },
        'general_tips': [
            f"Your {emotion} mood suggests {EMOTION_STYLES.get(emotion, {}).get('style', 'versatile')} styling",
            f"For {weather} weather, focus on {REGIONAL_CLIMATE.get(region, {}).get('considerations', ['comfort'])[0]}",
            f"{color.title()} is perfect for {COLOR_PSYCHOLOGY.get(color, {}).get('occasion', 'any occasion')}"
        ]
    })

@app.route('/api/colors', methods=['GET'])
def get_colors():
    return jsonify(list(COLOR_PSYCHOLOGY.keys()))

@app.route('/api/emotions', methods=['GET'])
def get_emotions():
    return jsonify(list(EMOTION_STYLES.keys()))

@app.route('/api/weather-options', methods=['GET'])
def get_weather_options():
    return jsonify(['sunny', 'rainy', 'cloudy', 'cold'])

@app.route('/api/regions', methods=['GET'])
def get_regions():
    return jsonify(list(REGIONAL_CLIMATE.keys()))

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'outfit-recommender'})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)