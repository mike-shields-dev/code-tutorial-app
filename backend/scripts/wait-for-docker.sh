#!/usr/bin/env bash
#   Use this script to test if a given TCP host/port are available
# Usage:
#    ./wait-for-it.sh /path/to/.env [-s] [-t timeout] [-- command args]
# - /path/to/.env is the path to the .env file containing POSTGRES_HOST and POSTGRES_PORT
# - -s flag makes the script to strict mode to fail if connection fails
# - -t timeout defines the timeout duration
# - -- command args is the command to execute once the port is available

env_file="$1"
shift

# Check if the .env file exists
if [[ ! -f "$env_file" ]]; then
  echo "Error: .env file not found at $env_file"
  exit 1
fi

# Function to get value from .env file and strip quotes if present
get_env_value() {
  local var_name
  var_name="$1"
  local value
  value=$(grep -E "^${var_name}=" "$env_file" | sed -E "s/^${var_name}=['\"]?(.*)['\"]?$/\1/")
  echo "$value"
}

# Extract and strip quotes from environment variables
host=$(get_env_value "POSTGRES_HOST")
port=$(get_env_value "POSTGRES_PORT")

if [[ -z "$host" || -z "$port" ]]; then
  echo "Error: POSTGRES_HOST or POSTGRES_PORT not found in $env_file"
  exit 1
fi

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
