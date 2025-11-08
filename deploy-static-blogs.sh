#!/bin/bash

echo "🚀 Deploying Static Blog System"
echo "==============================="

# Build the project
echo "🔨 Building project..."
npm run build

# Copy to production
echo "📁 Deploying to production..."
rm -rf /home/itgyani.com/public_html/*
cp -r dist/* /home/itgyani.com/public_html/
cp .htaccess /home/itgyani.com/public_html/

echo "✅ Static blog system deployed!"
echo "📊 Performance benefits:"
echo "  - ⚡ Instant loading (no database queries)"
echo "  - 💰 Zero database costs"
echo "  - 🚀 Perfect Lovable compatibility"
echo "  - 📱 Works offline"
echo "  - 🔍 Client-side search (super fast)"

echo ""
echo "🔄 To update blogs in the future:"
echo "  1. Run this export script: ./export-blogs-to-json.sh"
echo "  2. Build and deploy: ./deploy-static-blogs.sh"
echo ""
echo "🌐 Your blog is now live at: https://itgyani.com/blog"
