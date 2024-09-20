#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Start the application (assumes you have a start script in package.json)
npm run start:migrate:prod
