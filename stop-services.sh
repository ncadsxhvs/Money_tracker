#!/bin/bash

# Script to stop all development services for Money Tracker app

echo "🛑 Stopping all development services..."

# Kill all Next.js dev servers
echo "Stopping Next.js dev servers..."
pkill -f "next dev"

# Kill all npm processes
echo "Stopping npm processes..."
pkill -f "npm run dev"

# Kill processes on port 3000 (default Next.js port)
echo "Freeing up port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "✅ All services stopped successfully!"
echo ""
echo "To start the dev server again, run: npm run dev"
