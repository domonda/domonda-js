#!/bin/sh
set -eu

if [ -n "$NPM_AUTH_TOKEN" ]; then
  printf "unsafe-perm = true\n//registry.npmjs.org/:_authToken=%s" "$NPM_AUTH_TOKEN" > .npmrc
fi

sh -c "npm $*"
