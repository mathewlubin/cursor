import json
from mangum import Mangum
from app import app

# Configure for Lambda
app.config['ENV'] = 'production'

# Wrap Flask app for Lambda
handler = Mangum(app, lifespan="off")

def lambda_handler(event, context):
    """AWS Lambda handler function"""
    return handler(event, context)