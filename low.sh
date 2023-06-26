#!/bin/zsh

function start() {
    docker compose up
}

function build_start() {
    docker compose build && docker-compose up
}

function show_containers() {
    docker ps
}

function stop() {
    docker compose down
}

case "$1" in
    "d:start")
        start
        ;;
    "d:build-start")
        build_start
        ;;
    "d:show")
        show_containers
        ;;
    "d:stop")
        stop
        ;;
    *)
        echo "Invalid command. Usage: ./script.sh [d:start|d:build-start|d:show|d:stop]"
        ;;
esac
