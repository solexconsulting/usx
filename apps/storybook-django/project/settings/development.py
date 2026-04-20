"""
Development settings for storybook-django.

NOT safe for production — debug mode is on and all origins/hosts are allowed.
"""
from .base import *  # noqa: F401, F403

# SECURITY WARNING: keep the secret key used in production secret!
# This key is intentionally insecure and is only used in development.
SECRET_KEY = 'django-insecure-b+-^t+1!t^mz3jha_q!)3sh45)r5u!9jmr3xw3ixoef2^w-mxy'

DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ALLOW_ALL_ORIGINS = True
