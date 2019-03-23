#!/bin/bash

docker build -f Dockerfile-prod -t rudeboytom/koalattitude:prod-latest  .
docker push rudeboytom/koalattitude:prod-latest

ansible-playbook -i inventories/production deploy.yml
