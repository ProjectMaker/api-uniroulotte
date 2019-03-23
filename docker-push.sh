#!/bin/bash

docker build -f Dockerfile-prod -t "rudeboytom/koalattitude:$TRAVIS_BRANCH-$1" .
echo "$DOCKER_PASSWORD" | docker login --username "$DOCKER_USERNAME" --password-stdin docker.io
docker push "rudeboytom/koalattitude:$TRAVIS_BRANCH-$1"
