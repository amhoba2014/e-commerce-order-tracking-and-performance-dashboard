#!/usr/bin/env bash

# Function to perform cleanup on exit
cleanup() {
    echo "Cleaning up..."
    rm -f .pnpm-store
    rm -f node_modules
    echo "Cleanup complete."
}

# Set up a trap to call the cleanup function on script exit
trap 'cleanup' SIGTERM

# Create symbolic links
echo "Setting up symbolic links..."
ln -s ~/.pnpm-store .pnpm-store
ln -s ~/node_modules node_modules

# Run the development server
echo "Starting development server..."
pnpm run dev

# Keep the script running indefinitely
echo "Running indefinitely..."
sleep infinity &

wait $!