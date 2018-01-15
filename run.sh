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

# Source the environment
source "${DIR}/.env"

# Stop the application if running
cd "${DIR}"
./stop.sh

if [ "$SB_ENV" == "development" ]; then
	cd "${DIR}/client/"
	webpack-dev-server --inline --progress --config "${DIR}/client/build/webpack.dev.conf.js" &
	echo $! > "${DIR}/client.pid"
	cd "${DIR}/server/"
	forever start --pidFile "${DIR}/server.pid" --watchDirectory "${DIR}/server/" --spinSleepTime 1000 --minUptime 1000 server.js

elif [ "$SB_ENV" == "production" ]; then
	cd "${DIR}/client/"
	node build/build.js
	cd "${DIR}/server/"
	forever start --pidFile "${DIR}/server.pid" --watchDirectory "${DIR}/server/" --spinSleepTime 1000 --minUptime 1000 server.js

else
	echo "ERROR! Make sure SB_ENV environment variable is set."
fi
