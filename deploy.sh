#!/usr/bin/env sh
set -e

npm run build

cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:keet5/show-five-friends-from-vk.git master:gh-pages

cd -