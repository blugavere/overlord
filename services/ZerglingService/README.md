
# Docker Demo

## . /app creates a folder in the container of app and copies all app files there.

# builds a docker image
docker build -t demo .


docker run demo 

# ssh into container
docker run -it demo /bin/sh


# host port : container port

docker run -p 8080:3000 demo


docker-compose up demo

docker-compose up

1. Expose other app
2. make demo app environment aware to point to other ip if not in development
