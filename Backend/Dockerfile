# Backend/Dockerfile

FROM python:3.11-slim

WORKDIR /app

COPY ./requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Use gunicorn for production server
CMD ["gunicorn", "spinlog.wsgi:application", "--bind", "0.0.0.0:8000"]
