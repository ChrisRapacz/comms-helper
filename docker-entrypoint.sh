#!/bin/sh
set -e

# Ensure data directory exists and has correct permissions
mkdir -p /app/data
chown -R nextjs:nodejs /app/data

# Create initial messages.json if it doesn't exist
if [ ! -f /app/data/messages.json ]; then
  echo '{"messages": [], "emails": {}}' > /app/data/messages.json
  chown nextjs:nodejs /app/data/messages.json
fi

# Switch to nextjs user and run the application
exec su-exec nextjs:nodejs node server.js
