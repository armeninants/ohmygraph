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


PID_FILE_CLIENT="$DIR/client.pid"
if [ -e "$PID_FILE_CLIENT" ]; then
	PID_CLIENT=$(<"$PID_FILE_CLIENT")
	if ps -p $PID_CLIENT > /dev/null
	then
		kill "$PID_CLIENT"
		echo "Client applicaton stopped."
	else
		echo "WARNING! There is no client process with PID ${PID_CLIENT}."
	fi
	rm "$PID_FILE_CLIENT"
fi

PID_FILE_SERVER="$DIR/server.pid"
if [ -e "$PID_FILE_SERVER" ]; then
	PID_SERVER=$(<"$PID_FILE_SERVER")
	if ps -p $PID_SERVER > /dev/null
	then
		forever stop "$PID_SERVER"
		echo "Server applicaton stopped."
	else
		echo "WARNING! There is no server process with PID ${PID_SERVER}."
		rm "$PID_FILE_SERVER"
	fi
fi
