import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Heart, 
  Cloud, 
  MapPin, 
  Palette, 
  Sparkles, 
  Star, 
  Shirt,
  ShoppingBag,
  Sun,
  Zap,
  Lightbulb,
  Award
} from 'lucide-react';
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
  const [userProfile, setUserProfile] = useState(null);
  const [generalTips, setGeneralTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableColors, setAvailableColors] = useState([]);
  const [availableEmotions, setAvailableEmotions] = useState([]);
  const [weatherOptions, setWeatherOptions] = useState([]);
  const [regionOptions, setRegionOptions] = useState([]);

  useEffect(() => {
    // Fetch all available options from backend
    const fetchData = async () => {
      try {
        const [colorsRes, emotionsRes, weatherRes, regionsRes] = await Promise.all([
          axios.get(`${config.API_BASE_URL}/api/colors`),
          axios.get(`${config.API_BASE_URL}/api/emotions`),
          axios.get(`${config.API_BASE_URL}/api/weather-options`),
          axios.get(`${config.API_BASE_URL}/api/regions`)
        ]);
        setAvailableColors(colorsRes.data);
        setAvailableEmotions(emotionsRes.data);
        setWeatherOptions(weatherRes.data);
        setRegionOptions(regionsRes.data);
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
      setUserProfile(response.data.user_profile);
      setGeneralTips(response.data.general_tips);
    } catch (error) {
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const SelectButton = ({ options, value, onChange, icon: Icon, placeholder }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-white font-semibold">
        <Icon size={24} className="text-white" />
        <span className="text-lg">{placeholder}</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`px-4 py-3 rounded-xl border-2 transition-all duration-300 capitalize font-medium ${
              value === option
                ? 'border-white bg-white text-purple-600 shadow-lg transform scale-105'
                : 'border-white/30 bg-white/10 text-white hover:border-white/60 hover:bg-white/20'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  const ColorPicker = ({ colors, value, onChange }) => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-white font-semibold">
        <Palette size={24} className="text-white" />
        <span className="text-lg">Color Preference</span>
      </div>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`w-14 h-14 rounded-full border-4 transition-all duration-300 hover:scale-110 ${
              value === color
                ? 'border-white scale-110 shadow-lg'
                : 'border-white/40 hover:border-white/80'
            }`}
            style={{ backgroundColor: color }}
            title={color.charAt(0).toUpperCase() + color.slice(1)}
          />
        ))}
      </div>
    </div>
  );

  const OutfitCard = ({ recommendation }) => {
    const { outfit } = recommendation;
    
    return (
      <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <Shirt className="mr-2 text-purple-600" size={24} />
            Outfit #{recommendation.id}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={20} />
            <span className="text-lg font-bold text-gray-800">{recommendation.confidence_score}%</span>
          </div>
        </div>
        
        {/* Outfit Items */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                <Shirt size={16} className="mr-1" />
                Top
              </h4>
              <p className="text-purple-700 capitalize">{outfit.top}</p>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <ShoppingBag size={16} className="mr-1" />
                Bottom
              </h4>
              <p className="text-blue-700 capitalize">{outfit.bottom}</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
            <h4 className="font-semibold text-green-800 mb-2 flex items-center">
              <Cloud size={16} className="mr-1" />
              Outerwear
            </h4>
            <p className="text-green-700 capitalize">{outfit.outerwear}</p>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
              <Star size={16} className="mr-1" />
              Accessories
            </h4>
            <div className="flex flex-wrap gap-2">
              {outfit.accessories.map((accessory, index) => (
                <span key={index} className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-sm capitalize">
                  {accessory}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Styling Tips */}
        <div className="bg-gray-50 p-4 rounded-xl mb-4">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
            <Lightbulb size={18} className="mr-2 text-yellow-500" />
            Styling Tips
          </h4>
          <ul className="space-y-2">
            {outfit.styling_tips.map((tip, index) => (
              <li key={index} className="text-gray-700 text-sm flex items-start">
                <span className="text-purple-500 mr-2">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center bg-purple-100 px-3 py-2 rounded-full">
            <Zap size={14} className="mr-1 text-purple-600" />
            <span className="text-purple-800 text-sm font-medium">{recommendation.style_description}</span>
          </div>
          
          <div className="flex items-center bg-blue-100 px-3 py-2 rounded-full">
            <Award size={14} className="mr-1 text-blue-600" />
            <span className="text-blue-800 text-sm font-medium">{recommendation.occasion_suitability}</span>
          </div>
          
          <div className="flex items-center bg-green-100 px-3 py-2 rounded-full">
            <Sun size={14} className="mr-1 text-green-600" />
            <span className="text-green-800 text-sm font-medium">{recommendation.comfort_level} comfort</span>
          </div>
        </div>
      </div>
    );
  };

  const UserProfileCard = () => {
    if (!userProfile) return null;
    
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <Heart className="mr-2 text-red-500" />
          Your Style Profile
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Current Preferences</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-purple-600">Emotion:</span>
                <span className="ml-2 capitalize">{userProfile.emotion}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-blue-600">Weather:</span>
                <span className="ml-2 capitalize">{userProfile.weather}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-green-600">Region:</span>
                <span className="ml-2 capitalize">{userProfile.region}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-orange-600">Color:</span>
                <span className="ml-2 capitalize">{userProfile.color}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Style Recommendations</h4>
            <ul className="space-y-1">
              {generalTips.map((tip, index) => (
                <li key={index} className="text-gray-600 text-sm flex items-start">
                  <span className="text-purple-500 mr-2">✨</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center space-x-3 mb-4">
            <Sparkles className="text-white" size={40} />
            <h1 className="text-5xl md:text-6xl font-bold text-white">StyleMood AI</h1>
            <Sparkles className="text-white" size={40} />
          </div>
          <p className="text-white/90 text-xl max-w-3xl mx-auto">
            Discover your perfect outfit based on your emotions, weather, region, and color preferences. 
            Get complete styling recommendations tailored just for you.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-8 max-w-5xl mx-auto border border-white/20">
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
              className="w-full bg-white text-purple-600 font-bold py-5 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg transform hover:scale-105"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Sparkles className="animate-spin mr-2" size={20} />
                  Creating Your Perfect Outfits...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Shirt className="mr-2" size={20} />
                  Get My Style Recommendations ✨
                </span>
              )}
            </button>
          </form>
        </div>

        {/* User Profile */}
        <UserProfileCard />

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-white text-center mb-8">
              Your Perfect Outfit Recommendations
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((recommendation) => (
                <OutfitCard key={recommendation.id} recommendation={recommendation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;