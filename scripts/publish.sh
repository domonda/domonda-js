#!/bin/bash
set -ex

REPO="domonda/domonda-js"
GITHUB_USER=${GITHUB_USER:-domondabot}
GITHUB_PAT=${GITHUB_PAT:-"<undefined>"}

curl -X POST -u "$GITHUB_USER:$GITHUB_PAT" \
  -H "Accept: application/vnd.github.everest-preview+json"  \
  -H "Content-Type: application/json" \
  --data '{ "event_type": "publish" }' \
  "https://api.github.com/repos/$REPO/dispatches"
