#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available
# Usage:
#    ./wait-for-it.sh host:port [-s] [-t timeout] [-- command args]
# - host:port is the address and port to wait for
# - -s flag makes the script to strict mode to fail if connection fails
# - -t timeout defines the timeout duration
# - -- command args is the command to execute once the port is available

host="$1"
shift
port="$1"
shift

strict=0
timeout=15
cmd=""

while [[ $# -gt 0 ]]; do
  case $1 in
    -s)
      strict=1
      shift
      ;;
    -t)
      timeout="$2"
      shift
      shift
      ;;
    --)
      shift
      cmd="$*"
      break
      ;;
    *)
      shift
      ;;
  esac
done

for i in $(seq "$timeout"); do
  nc -z "$host" "$port" > /dev/null 2>&1
  result=$?
  if [[ $result -eq 0 ]]; then
    if [[ $strict -eq 1 ]]; then
      echo "$host:$port is available after $i seconds"
    fi
    break
  fi
  sleep 1
done

if [[ $result -ne 0 ]]; then
  if [[ $strict -eq 1 ]]; then
    echo "$host:$port is not available after $timeout seconds"
    exit 1
  else
    echo "$host:$port is not available yet"
  fi
fi

if [[ -n "$cmd" ]]; then
  exec $cmd
fi
