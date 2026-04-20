"""
Django settings package for storybook-django.

The active settings module is controlled by the DJANGO_SETTINGS_MODULE
environment variable. If unset, development settings are used (safe default
for local dev and CI without explicit configuration).

  Development (default): project.settings.development
  Production:            project.settings.production
"""
import os

_module = os.environ.get('DJANGO_SETTINGS_MODULE', 'project.settings.development')

# Only apply the fallback import when this __init__ is the entry point
# (i.e. DJANGO_SETTINGS_MODULE is "project.settings" or unset).
# When Django is pointed at project.settings.production directly, this
# file is never imported as a settings module.
if _module in ('project.settings', ''):
    from .development import *  # noqa: F401, F403
