#!/usr/bin/env bash
set -e
TAG=${TAG:-"latest"}
REPO=${DOCKER_REGISTRY:-"docker.apiumtech.io"}
echo "TAG ist $TAG"
docker push $REPO/${ADMIN_PROJECT:-karamba-frontend-admin}:"$TAG"
docker push $REPO/${FRONTEND_PROJECT:-karamba-frontend-carnovo}:"$TAG"
docker push $REPO/${PROXY_PROJECT:-karamba-proxy}:"$TAG"
