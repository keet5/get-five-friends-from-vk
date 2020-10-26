#!/usr/bin/env sh

npm build

git commit -a --amend -m 'deploy'
git pull
git push