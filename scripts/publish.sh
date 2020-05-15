#!/bin/bash
set -ex

REPO="domonda/domonda-js"
GITHUB_PAT=${GITHUB_PAT:-"<undefined>"}

curl -X POST -u "github:$GITHUB_PAT" \
  -H "Accept: application/vnd.github.everest-preview+json"  \
  -H "Content-Type: application/json" \
  --data '{ "event_type": "publish" }' \
  "https://api.github.com/repos/$REPO/dispatches"
