#!/bin/bash

# Script that will, if the git working tree is not dirty (i.e. you have no working changes),
# create a build and push it and the test page to the origin remote's gh-pages branch

# WARNING: ONE OF THE CONSEQUENCES OF RUNNING THIS SCRIPT WILL BE THE COMPLETE AND UTTER
#          DESTRUCTION OF YOUR `origin` REMOTE SERVER'S EXISTING `gh-pages` BRANCH.
#
#           NONE WILL BE SPARED. YE BE WARNED.

git update-index -q --ignore-submodules --refresh
git diff-index --quiet --ignore-submodules HEAD -- || {
    git status -uno
    echo "The git tree is dirty. Exiting..."
    exit 1
}

if [ -z "$1" ]; then
    echo "No commit message given. Exiting..."
    exit 1
fi

current_branch=$(git symbolic-ref -q HEAD)
current_branch=${current_branch##refs/heads/}
current_branch=${current_branch:-HEAD}

git show-ref --verify --quiet refs/heads/gh-pages && {
    git branch -D gh-pages
}

set -e
npm run build
git checkout --orphan gh-pages
git reset --hard
git add dist
git commit -m "$1"
git push -f origin gh-pages:gh-pages
git checkout $current_branch
