#!/bin/bash

while true; do
    docker stats --no-stream | { echo; cat; } | tee --append stats.csv
    echo >> stats.csv
    sleep 1
done
