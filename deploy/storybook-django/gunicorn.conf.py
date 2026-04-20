# Gunicorn configuration for storybook-django (production)
# https://docs.gunicorn.org/en/stable/settings.html

bind = "0.0.0.0:9090"
workers = 2
threads = 2

# Keep worker output streaming to container logs.
accesslog = "-"
errorlog = "-"
loglevel = "info"
