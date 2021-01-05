#!/usr/bin/env bash

echo "Checking .env file"
if [ ! -f .env ]; then
  echo "Copying .env.dev to .env"
  cp .env.dev .env
else
  echo "Using existing .env"
fi
