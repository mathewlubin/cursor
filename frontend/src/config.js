// API Configuration
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000'
  },
  production: {
    // Update this with your actual API Gateway URL after deployment
    API_BASE_URL: process.env.REACT_APP_API_URL || 'https://your-api-gateway-url.execute-api.us-east-1.amazonaws.com/Prod'
  }
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];