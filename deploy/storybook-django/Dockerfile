# ── storybook-django (Django + uWSGI) ─────────────────────────────────────
# Build context: repo root  (docker build -f deploy/storybook-django/Dockerfile .)
FROM python:3.12-slim

WORKDIR /app

# Install Python dependencies from the Django app's requirements.txt.
COPY apps/storybook-django/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the full monorepo so Django can resolve templates in packages/core.
COPY packages/core/src/components packages/core/src/components
COPY apps/storybook-django apps/storybook-django
# Copy Gunicorn config.
COPY deploy/storybook-django/gunicorn.conf.py /app/gunicorn.conf.py

WORKDIR /app/apps/storybook-django

ENV DJANGO_SETTINGS_MODULE=project.settings.production
ENV PYTHONUNBUFFERED=1

EXPOSE 9090

CMD ["gunicorn", "--config", "/app/gunicorn.conf.py", "project.wsgi:application"]
