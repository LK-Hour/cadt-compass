# CADT Compass 🧭

A Smart Campus web application for the Cambodia Academy of Digital Technology (CADT) that provides interactive campus navigation, real-time room availability, and unified event calendar.

## 🚀 Features

- **Interactive Campus Map** - Navigate buildings and rooms with ease
- **Real-Time Room Availability** - Find available study spaces instantly
- **Unified Event Calendar** - Never miss campus events
- **User Authentication** - Secure login with CADT credentials
- **Sustainability Features** - Locate recycling points and eco-friendly spaces
- **User Feedback System** - Report issues and suggest improvements

## 🏗️ Project Structure

```
cadt-compass/
├── apps/
│   ├── web/          # Next.js 14 Frontend (React)
│   └── api/          # NestJS Backend (Node.js)
├── packages/
│   └── types/        # Shared TypeScript types
├── .github/
│   └── workflows/    # CI/CD pipelines
└── docker-compose.yml
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **Maps:** React Leaflet
- **State:** Zustand + React Query
- **Forms:** React Hook Form + Zod

### Backend
- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Passport.js + JWT
- **Validation:** class-validator

### DevOps
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway
- **CI/CD:** GitHub Actions

## 🚦 Getting Started

### Prerequisites

Before you begin, make sure you have these installed:
- **Node.js 20+** - [Download here](https://nodejs.org/)
- **npm 10+** - Comes with Node.js
- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop/) (for database)
- **Git** - [Download here](https://git-scm.com/)

### Quick Start (For Team Members)

#### Option 1: Automated Setup (Recommended)

Run the setup script that does everything for you:

```bash
# Clone the repository
git clone https://github.com/LK-Hour/cadt-compass.git
cd cadt-compass

# Run the setup script
./setup-dev.sh
```

The script will:
- ✅ Check prerequisites (Node.js, npm, Docker)
- ✅ Install all dependencies
- ✅ Create environment files
- ✅ Start the database
- ✅ Run migrations and seed data

After the script completes, just update the API keys in the `.env` files and run `npm run dev`!

#### Option 2: Manual Setup

Follow these steps to run the project locally:

#### 1. Clone the Repository
```bash
git clone https://github.com/LK-Hour/cadt-compass.git
cd cadt-compass
```

#### 2. Install Dependencies
```bash
npm install
```
This will install all dependencies for both frontend and backend.

#### 3. Start the Database
Make sure Docker Desktop is running, then:
```bash
docker-compose up -d
```
This starts PostgreSQL database in the background. You can verify it's running:
```bash
docker ps
```
You should see a container named `cadt-compass-db`.

#### 4. Setup Environment Variables

**Frontend environment** (`apps/web/.env.local`):
```bash
# Create the file
touch apps/web/.env.local

# Add this content:
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyC...  # Ask team lead for this
```

**Backend environment** (`apps/api/.env`):
```bash
# Create the file
touch apps/api/.env

# Add this content:
DATABASE_URL="postgresql://cadt:compass@localhost:5432/cadt_compass"
JWT_SECRET=cadt-compass-super-secret-key-2025
JWT_EXPIRES_IN=7d

# Google OAuth (Ask team lead for these)
GOOGLE_CLIENT_ID=275937639188...
GOOGLE_CLIENT_SECRET=GOCSPX-...
GOOGLE_CALLBACK_URL=http://localhost:4000/api/auth/google/callback

# App config
PORT=4000
NODE_ENV=development
```

> **Note:** Contact your team lead (Loem Kimhour) to get the actual Google API keys and OAuth credentials.

#### 5. Setup the Database
```bash
# Navigate to backend
cd apps/api

# Run database migrations
npx prisma migrate dev

# Seed the database with sample data
npx prisma db seed

# Go back to root
cd ../..
```

#### 6. Start the Application
```bash
# Start both frontend and backend
npm run dev
```

This will start:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **API Docs:** http://localhost:4000/api

#### 7. Test the Application

Open your browser and navigate to:
- **Homepage:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Map:** http://localhost:3000/map
- **Events:** http://localhost:3000/events
- **Availability:** http://localhost:3000/availability

### Common Issues & Solutions

#### Docker not starting:
```bash
# Check if Docker Desktop is running
docker --version

# If database port is already in use, stop existing containers
docker-compose down
docker-compose up -d
```

#### Database connection errors:
```bash
# Reset the database
docker-compose down -v  # This removes volumes
docker-compose up -d
cd apps/api
npx prisma migrate dev
npx prisma db seed
```

#### Port already in use:
```bash
# Check what's using the port
lsof -i :3000  # Frontend
lsof -i :4000  # Backend
lsof -i :5432  # Database

# Kill the process if needed
kill -9 <PID>
```

#### Dependencies issues:
```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf apps/web/node_modules apps/web/package-lock.json
rm -rf apps/api/node_modules apps/api/package-lock.json
npm install
```

### Development Workflow (For Team Members)

#### Starting your day:
```bash
# Pull latest changes
git pull origin develop

# Make sure database is running
docker-compose up -d

# Start the app
npm run dev
```

#### Before making changes:
```bash
# Create a new feature branch
git checkout develop
git pull
git checkout -b feature/your-name/what-you-are-working-on

# Example:
git checkout -b feature/virak/add-search-bar
```

#### After making changes:
```bash
# Check what changed
git status

# Add your changes
git add .

# Commit with a clear message
git commit -m "feat: add search bar to map page"

# Push to GitHub
git push origin feature/your-name/what-you-are-working-on

# Then create a Pull Request on GitHub
```

### Stopping the Application

```bash
# Stop the dev servers
# Press Ctrl+C in the terminal where npm run dev is running

# Stop the database (optional)
docker-compose down
```

### Viewing the Database

You can view and edit the database using Prisma Studio:
```bash
cd apps/api
npx prisma studio
```
This opens a GUI at http://localhost:5555

## 📝 Development Workflow

For detailed development workflow, commit guidelines, and PR process, see [CONTRIBUTING.md](CONTRIBUTING.md).

### Git Workflow
```bash
# Create feature branch from develop
git checkout develop
git checkout -b feature/your-feature-name

# Commit with conventional commits
git commit -m "feat: add room availability feature"

# Push and create PR to develop
git push origin feature/your-feature-name
```

### Commit Message Convention
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Adding tests
- `chore:` Maintenance

## 🧪 Testing

```bash
# Run all tests
npm run test

# Run tests in specific workspace
npm run test --workspace=apps/web
npm run test --workspace=apps/api

# E2E tests (frontend)
cd apps/web
npm run test:e2e
```

## 🚢 Deployment

### Staging
- **URL:** staging.cadtcompass.edu.kh
- **Deploy:** Automatic on push to `develop`

### Production
- **URL:** cadtcompass.edu.kh
- **Deploy:** Manual trigger from `main`

## 👥 Team

- **Project Manager:** Heak An
- **Designer:** Te Sakura
- **Frontend Developers:** Khemrin Pranha, Luy Virak
- **Backend Developer:** Loem Kimhour
- **Database Engineer:** Heak An
- **QA Engineer:** Chut Homey

## 📄 License

Copyright © 2025 CADT Compass Team. All rights reserved.

## 🤝 Contributing

This is a student project for CADT. For questions or contributions, please contact the project team.

---

**Built with ❤️ by CADT Students**
# cadt-compass
# cadt-compass
# cadt-compass
