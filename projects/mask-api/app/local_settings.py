# https://flask.palletsprojects.com/en/1.1.x/config/

import os

# *****************************
# Environment specific settings
# *****************************

# DO NOT use "DEBUG = True" in production environments
DEBUG = True

# DO NOT use Unsecured Secrets in production environments
# Generate a safe one with:
#     python -c "from __future__ import print_function; import string; import random; print(''.join([random.choice(string.ascii_letters + string.digits + string.punctuation) for x in range(24)]));"
SECRET_KEY = "This is an UNSECURED Secret. CHANGE THIS for production environments."

# SQLAlchemy settings
SQLALCHEMY_DATABASE_URI = "sqlite:///../app.sqlite"
SQLALCHEMY_TRACK_MODIFICATIONS = False  # Avoids a SQLAlchemy Warning
SQLALCHEMY_COMMIT_ON_TEARDOWN = True
SQLALCHEMY_RECORD_QUERIES = True

# MongoDB
# update with every project
DB_NAME = "masky"
MONGODB_URL = "mongodb://localhost:27017/"

# mongodb connection string
# flask_pymongo to set up mongo connection
MONGO_URI = f"{MONGODB_URL}{DB_NAME}"
