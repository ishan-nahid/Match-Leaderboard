#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z $DB_HOST $DB_PORT; do
  sleep 0.5
done

echo "PostgreSQL started"

# Apply migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic --noinput

# Start Gunicorn server
exec gunicorn spinlog.wsgi:application --bind 0.0.0.0:8000
