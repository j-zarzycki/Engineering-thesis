import jwt
from dotenv import load_dotenv
import cryptography
from datetime import datetime, timedelta
import os


def create_token(device_id):
    encoded = jwt.encode({'device_id': device_id,
                          'exp': datetime.utcnow() + timedelta(seconds=float(os.getenv('JWT_AUTHMAXAGE')))},
                         os.getenv('JWT_SECRET'), algorithm="HS256")
    return encoded


def check_token(token):
    try:
        token = jwt.decode(token, os.getenv('JWT_SECRET'), algorithms="HS256")
        return True, token
    except:
        return False, None

