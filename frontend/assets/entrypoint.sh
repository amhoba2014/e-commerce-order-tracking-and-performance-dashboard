#!/usr/bin/env bash

# Run the development server
echo "Starting development server..." ;
pnpm i ;
pnpm dev &

# Keep the script running indefinitely
echo "Running indefinitely..." ;
sleep infinity &

wait $! ;