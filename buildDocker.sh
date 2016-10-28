#!/usr/bin/env bash

set -x
set -e

COMMON_BUILD_ARGS=""\
" --build-arg SOURCES_MIRROR=\"${SOURCES_MIRROR:-}\""\
" --build-arg SASS_BINARY_SITE=\"${SASS_BINARY_SITE:-}\""\
" --build-arg PHANTOMJS_CDNURL=\"${PHANTOMJS_CDNURL:-}\""\
" --build-arg NPM_CONFIG_REGISTRY=\"${NPM_CONFIG_REGISTRY:-}\""\
""

eval docker build --build-arg=APP_NAME=admin ${COMMON_BUILD_ARGS} -t $DOCKER_REGISTRY/${ADMIN_PROJECT:-karamba-frontend-admin}:$TAG .
eval docker build --build-arg=APP_NAME=carnovo ${COMMON_BUILD_ARGS} -t $DOCKER_REGISTRY/${FRONTEND_PROJECT:-karamba-frontend-carnovo}:$TAG .
