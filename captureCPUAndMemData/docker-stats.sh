#!/bin/bash

header="CONTAINER ID   NAME                                       CPU %     MEM USAGE / LIMIT     MEM %     NET I/O         BLOCK I/O       PIDS"
echo "$header" > stats.csv

while true; do
    stats_output=$(docker stats --no-stream | tail -n 2)
    echo "$stats_output" >> stats.csv
    echo >> stats.csv
    sleep 1
done
