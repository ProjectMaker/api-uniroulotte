#!/bin/bash

docker build -f Dockerfile-prod -t "rudeboytom/koalattitude:$1" .
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin docker.io
docker push "rudeboytom/koalattitude:$1"
