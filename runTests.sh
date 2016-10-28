#!/usr/bin/env bash
set -e
set -x
APP=$1

node test/resources/server.js &

echo "RUNNING FAKERSERVER"

npm run "$APP"prod:test