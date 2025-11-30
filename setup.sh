#!/bin/bash

# CADT Compass - Quick Setup Script
# This script helps you set up the development environment

set -e

echo "🚀 CADT Compass - Development Setup"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not running!${NC}"
    echo "Please start Docker Desktop and try again."
    exit 1
fi

echo -e "${GREEN}✅ Docker is installed and running${NC}"
echo ""

# Start PostgreSQL
echo "🐘 Starting PostgreSQL database..."
docker compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Check if database is healthy
if docker compose ps | grep -q "healthy"; then
    echo -e "${GREEN}✅ PostgreSQL is ready!${NC}"
else
    echo -e "${YELLOW}⚠️  PostgreSQL is starting... (this may take a few seconds)${NC}"
    sleep 5
fi

echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd apps/api
npm install

echo ""

# Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

echo ""

# Run database migrations
echo "📊 Running database migrations..."
npx prisma migrate dev --name init

echo ""

# Seed database (if seed file exists)
if [ -f "prisma/seed.ts" ]; then
    echo "🌱 Seeding database with sample data..."
    npx prisma db seed
fi

cd ../..

echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd apps/web
npm install
cd ../..

echo ""

echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "🎉 You can now start the development servers:"
echo ""
echo -e "  ${YELLOW}Backend:${NC}  cd apps/api && npm run start:dev"
echo -e "  ${YELLOW}Frontend:${NC} cd apps/web && npm run dev"
echo ""
echo -e "  ${YELLOW}Or run both:${NC} npm run dev (from root)"
echo ""
echo "📚 API Documentation: http://localhost:4000/api/docs"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
