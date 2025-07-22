import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, Cloud, MapPin, Palette, Sparkles, Star } from 'lucide-react';
import config from './config';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    emotion: '',
    weather: '',
    region: '',
    color: ''
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableEmotions, setAvailableEmotions] = useState([]);

  const weatherOptions = ['sunny', 'rainy', 'cloudy', 'cold'];
  const regionOptions = ['tropical', 'temperate', 'cold', 'desert'];

  useEffect(() => {
    // Fetch available colors and emotions from backend
    const fetchData = async () => {
      try {
        const [colorsRes, emotionsRes] = await Promise.all([
          axios.get(`${config.API_BASE_URL}/api/colors`),
          axios.get(`${config.API_BASE_URL}/api/emotions`)
        ]);
        setAvailableColors(colorsRes.data);
        setAvailableEmotions(emotionsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/recommend`, formData);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const SelectButton = ({ options, value, onChange, icon: Icon, placeholder }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-gray-700 font-medium">
        <Icon size={20} />
        <span>{placeholder}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 capitalize ${
              value === option
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white hover:border-primary-300'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const ColorPicker = ({ colors, value, onChange }) => (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-gray-700 font-medium">
        <Palette size={20} />
        <span>Color Preference</span>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`w-12 h-12 rounded-full border-4 transition-all duration-200 ${
              value === color
                ? 'border-gray-800 scale-110'
                : 'border-gray-300 hover:border-gray-500'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
    </div>
  );

  const RecommendationCard = ({ recommendation }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{recommendation.name}</h3>
        <div className="flex items-center space-x-1">
          <Star className="text-yellow-400 fill-current" size={16} />
          <span className="text-sm font-medium">{recommendation.confidence_score}%</span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{recommendation.description}</p>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-700">Style:</span>
          <span className="text-primary-600 capitalize">{recommendation.style}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-700">Color Mood:</span>
          <span className="text-primary-600 capitalize">{recommendation.color_mood}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="font-medium text-gray-700">Regional Tips:</span>
          <span className="text-gray-600 text-sm">{recommendation.regional_tip}</span>
        </div>
        
        <div className="mt-4 px-3 py-2 bg-primary-50 rounded-lg">
          <span className="text-sm text-primary-700 font-medium">
            Perfect for {recommendation.weather_appropriate} weather
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Sparkles className="text-white" size={32} />
            <h1 className="text-4xl md:text-5xl font-bold text-white">DressMe AI</h1>
            <Sparkles className="text-white" size={32} />
          </div>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Get personalized dress recommendations based on your emotions, weather, region, and color preferences
          </p>
        </div>

        {/* Form */}
        <div className="glass-morphism rounded-2xl p-8 mb-8 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            <SelectButton
              options={availableEmotions}
              value={formData.emotion}
              onChange={(value) => handleInputChange('emotion', value)}
              icon={Heart}
              placeholder="How are you feeling today?"
            />

            <SelectButton
              options={weatherOptions}
              value={formData.weather}
              onChange={(value) => handleInputChange('weather', value)}
              icon={Cloud}
              placeholder="What's the weather like?"
            />

            <SelectButton
              options={regionOptions}
              value={formData.region}
              onChange={(value) => handleInputChange('region', value)}
              icon={MapPin}
              placeholder="What's your region?"
            />

            <ColorPicker
              colors={availableColors}
              value={formData.color}
              onChange={(value) => handleInputChange('color', value)}
            />

            <button
              type="submit"
              disabled={!formData.emotion || !formData.weather || !formData.region || !formData.color || loading}
              className="w-full bg-white text-primary-600 font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Finding Perfect Dresses...' : 'Get My Recommendations ✨'}
            </button>
          </form>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Your Perfect Dress Recommendations
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((recommendation) => (
                <RecommendationCard key={recommendation.id} recommendation={recommendation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;