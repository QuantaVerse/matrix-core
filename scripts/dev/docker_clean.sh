#!/usr/bin/env bash

# ---- removing containers ----
echo "[Stopping And Deleting Containers]"
for i in $(docker ps -a | grep matrix-core | awk '{print $NF}')
do
echo "[Deleted]: "
docker container stop "$i"
docker container rm "$i" -f
done

# ---- removing dangling images ----
echo "[Deleting Dangling Images]"
echo "[Deleted]: "
docker container prune -f

# ---- removing network ----
echo "[Stopping And Deleting Networks]"
for i in $(docker network ls | grep matrix-core | awk '{print $2}')
do
echo "[Deleted]: "
docker network rm "$i"
done
echo "[Deleted]: "

# ---- removing dangling networks ----
echo "[Deleting Dangling Networks]"
echo "[Deleted]: "
docker network prune -f
