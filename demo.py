#!/usr/bin/env python3
"""
StyleMood AI - Outfit Recommender Demo
=====================================

A lightweight outfit recommender that provides personalized clothing suggestions
based on user emotion, weather conditions, region, and color preferences.

Features:
- Complete outfit recommendations (tops, bottoms, outerwear, accessories)
- Emotion-based styling suggestions
- Weather-appropriate clothing choices
- Regional climate considerations
- Color psychology integration
- Comprehensive styling tips

Usage:
    python demo.py
"""

import requests
import json
import sys
from typing import Dict, Any

API_BASE_URL = "http://localhost:5000"

def test_api_connection():
    """Test if the API is running and accessible."""
    try:
        response = requests.get(f"{API_BASE_URL}/health")
        if response.status_code == 200:
            print("✅ API is running successfully!")
            return True
        else:
            print(f"❌ API health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Make sure the backend is running on port 5000.")
        return False

def get_available_options():
    """Fetch available options from the API."""
    try:
        colors = requests.get(f"{API_BASE_URL}/api/colors").json()
        emotions = requests.get(f"{API_BASE_URL}/api/emotions").json()
        weather_options = requests.get(f"{API_BASE_URL}/api/weather-options").json()
        regions = requests.get(f"{API_BASE_URL}/api/regions").json()
        
        return {
            'colors': colors,
            'emotions': emotions,
            'weather': weather_options,
            'regions': regions
        }
    except Exception as e:
        print(f"❌ Error fetching options: {e}")
        return None

def display_outfit_recommendation(recommendation: Dict[str, Any]):
    """Display a single outfit recommendation in a formatted way."""
    print(f"\n🎯 Outfit #{recommendation['id']} (Confidence: {recommendation['confidence_score']}%)")
    print("=" * 60)
    
    outfit = recommendation['outfit']
    
    # Display outfit items
    print(f"👕 Top: {outfit['top'].title()}")
    print(f"👖 Bottom: {outfit['bottom'].title()}")
    print(f"🧥 Outerwear: {outfit['outerwear'].title()}")
    print(f"✨ Accessories: {', '.join([acc.title() for acc in outfit['accessories']])}")
    
    # Display styling information
    print(f"\n🎨 Style: {recommendation['style_description'].title()}")
    print(f"🎭 Occasion: {recommendation['occasion_suitability'].title()}")
    print(f"😌 Comfort Level: {recommendation['comfort_level'].title()}")
    
    # Display styling tips
    print(f"\n💡 Styling Tips:")
    for i, tip in enumerate(outfit['styling_tips'], 1):
        print(f"   {i}. {tip}")
    
    # Display fabric recommendations
    print(f"\n🧵 Recommended Fabrics: {', '.join(outfit['fabric_recommendations'])}")
    print(f"🎨 Color Palette: {', '.join(outfit['color_palette'])}")
    print(f"👔 Fit Guide: {outfit['fit_guide']}")

def get_outfit_recommendations(user_data: Dict[str, str]):
    """Get outfit recommendations from the API."""
    try:
        response = requests.post(f"{API_BASE_URL}/api/recommend", json=user_data)
        if response.status_code == 200:
            return response.json()
        else:
            print(f"❌ Error getting recommendations: {response.status_code}")
            print(response.text)
            return None
    except Exception as e:
        print(f"❌ Error calling API: {e}")
        return None

def interactive_demo():
    """Run an interactive demo of the outfit recommender."""
    print("🌟 Welcome to StyleMood AI - Your Personal Outfit Recommender! 🌟")
    print("\nThis AI will recommend complete outfits based on your:")
    print("• Current emotion and mood")
    print("• Weather conditions")
    print("• Regional climate")
    print("• Color preferences")
    print("\nLet's get started!\n")
    
    # Test API connection
    if not test_api_connection():
        return
    
    # Get available options
    options = get_available_options()
    if not options:
        return
    
    # Collect user input
    print("📝 Please provide your preferences:\n")
    
    # Emotion selection
    print(f"💭 Available emotions: {', '.join(options['emotions'])}")
    emotion = input("How are you feeling today? ").strip().lower()
    while emotion not in options['emotions']:
        print(f"Please choose from: {', '.join(options['emotions'])}")
        emotion = input("How are you feeling today? ").strip().lower()
    
    # Weather selection
    print(f"\n🌤️ Available weather conditions: {', '.join(options['weather'])}")
    weather = input("What's the weather like? ").strip().lower()
    while weather not in options['weather']:
        print(f"Please choose from: {', '.join(options['weather'])}")
        weather = input("What's the weather like? ").strip().lower()
    
    # Region selection
    print(f"\n🌍 Available regions: {', '.join(options['regions'])}")
    region = input("What's your region/climate? ").strip().lower()
    while region not in options['regions']:
        print(f"Please choose from: {', '.join(options['regions'])}")
        region = input("What's your region/climate? ").strip().lower()
    
    # Color selection
    print(f"\n🎨 Available colors: {', '.join(options['colors'])}")
    color = input("What's your preferred color? ").strip().lower()
    while color not in options['colors']:
        print(f"Please choose from: {', '.join(options['colors'])}")
        color = input("What's your preferred color? ").strip().lower()
    
    # Get recommendations
    user_data = {
        'emotion': emotion,
        'weather': weather,
        'region': region,
        'color': color
    }
    
    print(f"\n🔍 Generating outfit recommendations for you...")
    recommendations_data = get_outfit_recommendations(user_data)
    
    if not recommendations_data:
        return
    
    # Display user profile
    profile = recommendations_data['user_profile']
    print(f"\n👤 Your Style Profile:")
    print(f"   Emotion: {profile['emotion'].title()}")
    print(f"   Weather: {profile['weather'].title()}")
    print(f"   Region: {profile['region'].title()}")
    print(f"   Color: {profile['color'].title()}")
    print(f"   Style Preference: {profile['style_preference'].title()}")
    
    # Display general tips
    print(f"\n💫 General Style Tips:")
    for i, tip in enumerate(recommendations_data['general_tips'], 1):
        print(f"   {i}. {tip}")
    
    # Display recommendations
    print(f"\n🎉 Here are your personalized outfit recommendations:")
    for recommendation in recommendations_data['recommendations']:
        display_outfit_recommendation(recommendation)
    
    print(f"\n✨ Enjoy your stylish day! ✨")

def run_sample_requests():
    """Run sample requests to demonstrate the API."""
    print("🧪 Running sample requests to demonstrate the outfit recommender...\n")
    
    sample_requests = [
        {
            'name': 'Professional Meeting',
            'data': {'emotion': 'professional', 'weather': 'cloudy', 'region': 'temperate', 'color': 'navy'}
        },
        {
            'name': 'Weekend Party',
            'data': {'emotion': 'playful', 'weather': 'sunny', 'region': 'tropical', 'color': 'pink'}
        },
        {
            'name': 'Romantic Date',
            'data': {'emotion': 'romantic', 'weather': 'rainy', 'region': 'cold', 'color': 'red'}
        }
    ]
    
    for sample in sample_requests:
        print(f"🎯 Sample: {sample['name']}")
        print(f"Input: {sample['data']}")
        
        result = get_outfit_recommendations(sample['data'])
        if result:
            print(f"✅ Successfully generated {len(result['recommendations'])} outfit recommendations")
            # Show just the first recommendation briefly
            first_outfit = result['recommendations'][0]['outfit']
            print(f"   Sample outfit: {first_outfit['top']}, {first_outfit['bottom']}, {first_outfit['outerwear']}")
        else:
            print("❌ Failed to get recommendations")
        print()

if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "--sample":
        run_sample_requests()
    else:
        interactive_demo()