#!/bin/bash

# Money Tracker - Local Development Startup Script

echo "🚀 Starting Money Tracker..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the development server
echo "🌐 Starting development server..."
echo "📍 Server will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
