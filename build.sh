#!/usr/bin/env bash
set -e
npm install
. ./build/buildCarnovo.sh
. ./build/buildAdmin.sh
. ./build/buildProxy.sh
