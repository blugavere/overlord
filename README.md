# overlord
The most complicated hello world ever.

![alt tag](https://github.com/blugavere/overlord/blob/master/public/images/bfcz3xV.png)

![alt tag](https://github.com/blugavere/overlord/blob/master/public/images/carbot_starcrafts___overlords_grumplords_cutelords_by_coulden2016ex-dail0cn.png)


# Getting Started

npm run dev
Navigate to http://localhost:8080

## Installation

## Getting Up And Running

```bash
# Build all service images
bash reimage

# Starts all of the microservices
docker-compose -f ./overlord/docker-compose.dev.yml up

# or...
npm run dev


```

## Debugging

```bash
# ssh into container
docker run -it [image name] /bin/sh

```

## Cleanup

```bash

# Get a list of all current processes
docker ps

# Get a list of all current images
docker images

# Stop a process
docker kill [image id]

# Stop all processes
docker stop $(docker ps -a -q)

# Delete all process
docker rm $(docker ps -a -q)

# Delete all images
docker rmi $(docker images -q)
```

## Contributing

Contribute!