"""
Production settings for storybook-django.

All sensitive values are read from environment variables.
Set DJANGO_SETTINGS_MODULE=project.settings.production in the container/host.
"""
import os
from .base import *  # noqa: F401, F403

# SECRET_KEY must be supplied via the environment in production.
SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

DEBUG = False

# Comma-separated list of allowed hostnames, e.g. "storybook.example.com,localhost"
ALLOWED_HOSTS = [h.strip() for h in os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(',') if h.strip()]

# Comma-separated list of allowed CORS origins, e.g. "https://storybook.example.com"
_cors_origins = [o.strip() for o in os.environ.get('DJANGO_CORS_ALLOWED_ORIGINS', '').split(',') if o.strip()]
if _cors_origins:
    CORS_ALLOWED_ORIGINS = _cors_origins
else:
    CORS_ALLOW_ALL_ORIGINS = False

# Enforce HTTPS in production.
SECURE_SSL_REDIRECT = os.environ.get('DJANGO_SECURE_SSL_REDIRECT', 'true').lower() == 'true'
SECURE_HSTS_SECONDS = int(os.environ.get('DJANGO_HSTS_SECONDS', '31536000'))
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
