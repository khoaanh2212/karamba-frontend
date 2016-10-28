.PHONY: build all

DOCKER_REGISTRY?=localhost:5000
TAG?=latest
ADMIN_PROJECT?=karamba-frontend-admin
FRONTEND_PROJECT?=karamba-frontend-carnovo
DEBIAN_JESSIE_SOURCES_MIRROR?=

ENVVARS=DOCKER_REGISTRY=$(DOCKER_REGISTRY) TAG=$(TAG) SOURCES_MIRROR="$(DEBIAN_JESSIE_SOURCES_MIRROR)" ADMIN_PROJECT=$(ADMIN_PROJECT) FRONTEND_PROJECT=$(FRONTEND_PROJECT)

all: build

delete:
	echo "ALL DELETE ARE BELONG TO US. Punny Human"

build:
	$(ENVVARS) . ./buildDocker.sh
	$(ENVVARS) . ./build/buildProxy.sh
	$(ENVVARS) . ./publish.sh
