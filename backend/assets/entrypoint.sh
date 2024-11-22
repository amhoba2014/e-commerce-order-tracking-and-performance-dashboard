#!/usr/bin/env bash

# Run the development server
echo "Starting development server..." ;
poetry install ;
poetry run fastapi dev --host 0.0.0.0 --port 8000 --root-path /api main.py &

# Keep the script running indefinitely
echo "Running indefinitely..." ;
sleep infinity &

wait $! ;