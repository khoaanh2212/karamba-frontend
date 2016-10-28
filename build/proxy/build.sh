#!/usr/bin/env bash
TAG=${TAG:-"latest"}
REPO=${DOCKER_REGISTRY:-"localhost:5000"}
docker build -t "$REPO"/${PROXY_PROJECT:-karamba-proxy}:"$TAG" .
