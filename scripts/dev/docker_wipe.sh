#!/usr/bin/env bash

# ---- wipe docker volumes ----
echo "[Wipe Docker Volumes]"
cd docker/timescale/pgadmin4-volume/ && find . \! -name ".keep" -delete && cd ../../..
cd docker/timescale/postgres-volume/ && find . \! -name ".keep" -delete && cd ../../..
