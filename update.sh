#!/usr/bin/env bash
set -e

# Get the source directory of the script
SOURCE="${BASH_SOURCE[0]}"
while [ -h "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
  SOURCE="$(readlink "$SOURCE")"
  [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE" # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"

cd "$DIR"

# TODO: switch to maintenance instead of stopping
./stop.sh

git fetch origin master
git reset --hard origin/master

cd "$DIR/client"
npm install
# npm run build

cd "$DIR/server"
npm install

./run.sh