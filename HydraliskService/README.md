
# Docker Demo

## . /app creates a folder in the container of app and copies all app files there.

# builds a docker image
docker build -t demo .


docker build -t other-dev -f Dockerfile.dev .

docker build -t other-dev -f Dockerfile.dev .

docker-compose -f docker-compose.dev.yml up