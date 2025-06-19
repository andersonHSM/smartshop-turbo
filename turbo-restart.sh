#!/bin/bash

# Script to restart turbo and clean caches
echo "🧹 Cleaning Turbo cache..."
rm -rf .turbo
rm -rf node_modules/.cache/turbo

echo "🧹 Cleaning workspace node_modules .turbo folders..."
find ./apps -name ".turbo" -type d -exec rm -rf {} +

echo "💾 Backing up pnpm-lock.yaml"
cp pnpm-lock.yaml pnpm-lock.yaml.bak 2>/dev/null || echo "No lock file to backup"

echo "🔄 Cleaning pnpm store and reinstalling"
pnpm store prune
pnpm install --no-frozen-lockfile

echo "🚀 Running build"
pnpm build

echo "✅ Done! Turbo configuration updated."
