# Gunicorn configuration for storybook-django (production)
# https://docs.gunicorn.org/en/stable/settings.html

bind = "0.0.0.0:9090"
workers = 2
threads = 2

# 0 = unlimited --> Allow unlimited request line size to avoid 414
# errors with large Storybook stories.
limit_request_line = 0

# Trust X-Forwarded-Proto from any upstream IP so Django's
# SECURE_PROXY_SSL_HEADER works correctly behind Docker/nginx proxies.
forwarded_allow_ips = "*"

# Keep worker output streaming to container logs.
accesslog = "-"
errorlog = "-"
loglevel = "info"
