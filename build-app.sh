#!/usr/bin/env bash
set -e
APP_NAME=$1
echo "appname ist $APP_NAME"
rm -fr dist/*
echo "APIHOST: $APIHOST"
npm run-script "$APP_NAME"":prod"

