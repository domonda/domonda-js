#!/bin/sh

set -eu

SSH_PATH="$HOME/.ssh"
mkdir "$SSH_PATH"
echo "$DEPLOY_KEY" > "$SSH_PATH/deploy_key"
chmod 600 "$SSH_PATH/deploy_key"

sh -c "rsync $1 -e 'ssh -i $SSH_PATH/deploy_key -o StrictHostKeyChecking=no' $GITHUB_WORKSPACE/$2 $3"
