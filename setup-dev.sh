#!/bin/bash

# CADT Compass - Development Setup Script
# This script automates the initial setup for team members

set -e  # Exit on error

echo "🧭 CADT Compass - Development Setup"
echo "===================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Print colored message
print_step() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Step 1: Check prerequisites
echo "Step 1: Checking prerequisites..."
echo ""

if ! command_exists node; then
    print_error "Node.js is not installed. Please install Node.js 20+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    print_error "Node.js version must be 20 or higher. Current: $(node -v)"
    exit 1
fi
print_step "Node.js $(node -v) installed"

if ! command_exists npm; then
    print_error "npm is not installed"
    exit 1
fi
print_step "npm $(npm -v) installed"

if ! command_exists docker; then
    print_error "Docker is not installed. Please install Docker Desktop from https://www.docker.com/products/docker-desktop/"
    exit 1
fi
print_step "Docker $(docker -v | cut -d' ' -f3 | tr -d ',') installed"

if ! docker info >/dev/null 2>&1; then
    print_error "Docker is not running. Please start Docker Desktop"
    exit 1
fi
print_step "Docker is running"

echo ""

# Step 2: Install dependencies
echo "Step 2: Installing dependencies..."
echo ""
npm install
print_step "Dependencies installed"
echo ""

# Step 3: Setup environment variables
echo "Step 3: Setting up environment variables..."
echo ""

# Frontend .env.local
if [ ! -f "apps/web/.env.local" ]; then
    cat > apps/web/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
EOF
    print_step "Created apps/web/.env.local"
    print_warning "You need to update NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in apps/web/.env.local"
else
    print_warning "apps/web/.env.local already exists, skipping..."
fi

# Backend .env
if [ ! -f "apps/api/.env" ]; then
    cat > apps/api/.env << 'EOF'
DATABASE_URL="postgresql://cadt:compass@localhost:5432/cadt_compass"
JWT_SECRET=cadt-compass-super-secret-key-2025
JWT_EXPIRES_IN=7d

# Google OAuth - Get these from team lead
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# App config
PORT=4000
NODE_ENV=development
EOF
    print_step "Created apps/api/.env"
    print_warning "You need to update Google OAuth credentials in apps/api/.env"
else
    print_warning "apps/api/.env already exists, skipping..."
fi

echo ""

# Step 4: Start database
echo "Step 4: Starting PostgreSQL database..."
echo ""
docker-compose up -d
sleep 3  # Wait for database to be ready
print_step "Database started"
echo ""

# Step 5: Run database migrations
echo "Step 5: Running database migrations..."
echo ""
cd apps/api
npx prisma migrate dev --name init || print_warning "Migrations already applied or failed"
print_step "Database migrations completed"
echo ""

# Step 6: Seed database
echo "Step 6: Seeding database with sample data..."
echo ""
npx prisma db seed || print_warning "Database already seeded or seeding failed"
print_step "Database seeded"
cd ../..
echo ""

# Summary
echo ""
echo "=========================================="
echo "🎉 Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo ""
echo "1. Update API keys in environment files:"
echo "   - ${YELLOW}apps/web/.env.local${NC} - Add Google Maps API key"
echo "   - ${YELLOW}apps/api/.env${NC} - Add Google OAuth credentials"
echo ""
echo "2. Start the development servers:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "3. Open your browser:"
echo "   Frontend: ${GREEN}http://localhost:3000${NC}"
echo "   Backend:  ${GREEN}http://localhost:4000${NC}"
echo "   API Docs: ${GREEN}http://localhost:4000/api${NC}"
echo ""
echo "4. View database (optional):"
echo "   ${GREEN}cd apps/api && npx prisma studio${NC}"
echo ""
echo "Need help? Check CONTRIBUTING.md or contact your team lead!"
echo ""
