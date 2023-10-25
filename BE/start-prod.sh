#!/bin/sh
#pem_key_path="/c/Users/SSAFY/Desktop/K9B104T.pem"
#
## 접속할 EC2 인스턴스의 주소
#ec2_instance_address="k9b204.p.ssafy.io"

docker-compose -f docker-compose.yml pull

COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml up --build -d server

docker rmi -f $(docker images -f "dangling=true" -q) || true

