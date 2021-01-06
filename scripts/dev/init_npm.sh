#!/usr/bin/env bash

echo "Checking npm version"
npm --version
echo "Checking node version"
node --version
NODE_VER=$(node --version)
NODE_VER_MAJOR=$(echo "$NODE_VER" | cut -d'.' -f 1 | cut -d'v' -f 2)
NODE_VER_MINOR=$(echo "$NODE_VER" | cut -d'.' -f 2)
if { [ "$NODE_VER_MAJOR" -eq 14 ] && [ "$NODE_VER_MINOR" -ge 15 ]; } then
  echo "Installing node modules"
  npm install
else
  echo "Required node version > v14.15"
fi
