#!/usr/bin/env bash

# ---- init TimescaleDB ----
DOCKER_POSTGRES_IMAGE=$(docker ps | grep matrix-core-postgres | awk '{print $1}')

sleep 2

docker cp ./scripts/dev/pg_init.sql "$DOCKER_POSTGRES_IMAGE":/pg_init.sql
docker exec -it "$DOCKER_POSTGRES_IMAGE" psql -U postgres -f /pg_init.sql

docker exec -it "$DOCKER_POSTGRES_IMAGE" psql -U postgres -c "\du"
docker exec -it "$DOCKER_POSTGRES_IMAGE" psql -U postgres -l

