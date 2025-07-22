#!/usr/bin/env python3
"""
DressMe AI - Demo Script
This script demonstrates the dress recommendation API functionality.
"""

import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

import app
import json
from flask import Flask

def demo_api():
    """Demonstrate the DressMe AI API functionality."""
    print("🎀 DressMe AI - API Demo")
    print("=" * 50)
    
    # Create test client
    test_app = app.app
    client = test_app.test_client()
    
    # Test 1: Health Check
    print("\n🏥 Health Check:")
    health = client.get('/health')
    print(f"Status: {health.get_json()['status']}")
    
    # Test 2: Available Options
    print("\n🎨 Available Colors:")
    colors = client.get('/api/colors')
    print(", ".join(colors.get_json()))
    
    print("\n💭 Available Emotions:")
    emotions = client.get('/api/emotions')
    print(", ".join(emotions.get_json()))
    
    # Test 3: Different Recommendation Scenarios
    scenarios = [
        {
            'name': 'Happy Beach Day',
            'data': {'emotion': 'happy', 'weather': 'sunny', 'region': 'tropical', 'color': 'yellow'}
        },
        {
            'name': 'Professional Meeting',
            'data': {'emotion': 'professional', 'weather': 'cloudy', 'region': 'temperate', 'color': 'black'}
        },
        {
            'name': 'Romantic Evening',
            'data': {'emotion': 'romantic', 'weather': 'cold', 'region': 'cold', 'color': 'pink'}
        },
        {
            'name': 'Confident Party Look',
            'data': {'emotion': 'confident', 'weather': 'rainy', 'region': 'temperate', 'color': 'red'}
        }
    ]
    
    for scenario in scenarios:
        print(f"\n✨ Scenario: {scenario['name']}")
        print("-" * 30)
        
        response = client.post('/api/recommend', 
                              data=json.dumps(scenario['data']),
                              content_type='application/json')
        result = response.get_json()
        
        print(f"Input: {scenario['data']}")
        print(f"Recommendations ({len(result['recommendations'])}):")
        
        for i, rec in enumerate(result['recommendations'], 1):
            print(f"  {i}. {rec['name']}")
            print(f"     Style: {rec['style']}")
            print(f"     Color Mood: {rec['color_mood']}")
            print(f"     Confidence: {rec['confidence_score']}%")
            print(f"     Description: {rec['description']}")
            print()

def interactive_demo():
    """Interactive demo where user can input their preferences."""
    print("\n🎯 Interactive Demo")
    print("=" * 50)
    
    test_app = app.app
    client = test_app.test_client()
    
    # Get available options
    colors_response = client.get('/api/colors')
    emotions_response = client.get('/api/emotions')
    colors = colors_response.get_json()
    emotions = emotions_response.get_json()
    
    weather_options = ['sunny', 'rainy', 'cloudy', 'cold']
    region_options = ['tropical', 'temperate', 'cold', 'desert']
    
    print("\nLet's find your perfect dress! 👗")
    
    # Get user input
    print(f"\n1. How are you feeling? ({', '.join(emotions)})")
    emotion = input("Enter emotion: ").lower().strip()
    
    print(f"\n2. What's the weather like? ({', '.join(weather_options)})")
    weather = input("Enter weather: ").lower().strip()
    
    print(f"\n3. What's your region? ({', '.join(region_options)})")
    region = input("Enter region: ").lower().strip()
    
    print(f"\n4. What color do you prefer? ({', '.join(colors)})")
    color = input("Enter color: ").lower().strip()
    
    # Validate inputs
    if emotion not in emotions:
        emotion = 'happy'
        print(f"Invalid emotion, using default: {emotion}")
    
    if weather not in weather_options:
        weather = 'sunny'
        print(f"Invalid weather, using default: {weather}")
    
    if region not in region_options:
        region = 'temperate'
        print(f"Invalid region, using default: {region}")
    
    if color not in colors:
        color = 'blue'
        print(f"Invalid color, using default: {color}")
    
    # Get recommendations
    user_data = {
        'emotion': emotion,
        'weather': weather,
        'region': region,
        'color': color
    }
    
    response = client.post('/api/recommend', 
                          data=json.dumps(user_data),
                          content_type='application/json')
    result = response.get_json()
    
    print(f"\n🎉 Your Personalized Recommendations:")
    print("=" * 50)
    
    for i, rec in enumerate(result['recommendations'], 1):
        print(f"\n{i}. ✨ {rec['name']} ✨")
        print(f"   Style: {rec['style']}")
        print(f"   Color Mood: {rec['color_mood']}")
        print(f"   Regional Tips: {rec['regional_tip']}")
        print(f"   Perfect for: {rec['weather_appropriate']} weather")
        print(f"   Confidence Score: {rec['confidence_score']}%")
        print(f"   Description: {rec['description']}")

if __name__ == "__main__":
    print("🌟 Welcome to DressMe AI Demo! 🌟")
    
    demo_api()
    
    print("\n" + "=" * 50)
    
    try:
        interactive_demo()
    except KeyboardInterrupt:
        print("\n\nDemo interrupted. Thanks for trying DressMe AI! 👋")
    except Exception as e:
        print(f"\nError in interactive demo: {e}")
        print("But the API demo above shows everything is working! ✅")
    
    print("\n🚀 To run the full web application:")
    print("   ./run.sh")
    print("   or follow instructions in SETUP.md")
    print("\n💡 Visit http://localhost:3000 when running!")