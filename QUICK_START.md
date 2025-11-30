# 🚀 CADT Compass - Quick Start Guide

## Prerequisites Check

Before starting, ensure you have:

1. **Node.js 20+** - Run: `node --version`
2. **npm 10+** - Run: `npm --version`
3. **Docker Desktop** - Must be running!

## 🐳 Step 1: Start Docker (IMPORTANT!)

### On Arch Linux:

```bash
# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot (optional)
sudo systemctl enable docker

# Check if Docker is running
docker info
```

If Docker Desktop is installed:
```bash
# Start Docker Desktop (it will start the daemon)
# Open Docker Desktop application from your applications menu
```

## 📦 Step 2: Automated Setup

Run the setup script:

```bash
./setup.sh
```

This script will:
- ✅ Check Docker is running
- ✅ Start PostgreSQL database
- ✅ Install all dependencies
- ✅ Generate Prisma Client
- ✅ Run database migrations
- ✅ Seed sample data

## 🎯 Step 3: Start Development Servers

### Option A: Start Both (Recommended)
```bash
npm run dev
```

### Option B: Start Separately

**Terminal 1 - Backend:**
```bash
cd apps/api
npm run start:dev
```

**Terminal 2 - Frontend:**
```bash
cd apps/web
npm run dev
```

## 🌐 Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000/api
- **API Documentation:** http://localhost:4000/api/docs
- **Database:** localhost:5432

## 🔐 Test Credentials

### Admin Account
- Email: `admin@cadt.edu.kh`
- Password: `admin123`

### Student Accounts
- Email: `student@cadt.edu.kh`
- Password: `student123`

## 🐛 Troubleshooting

### Docker not running?
```bash
# Check Docker status
systemctl --user status docker-desktop
# OR
sudo systemctl status docker

# If not running, start it
sudo systemctl start docker
```

### Port already in use?
```bash
# Kill process on port 4000 (backend)
lsof -ti:4000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 5432 (database)
lsof -ti:5432 | xargs kill -9
```

### Database connection issues?
```bash
# Check if PostgreSQL container is running
docker compose ps

# View PostgreSQL logs
docker compose logs postgres

# Restart database
docker compose restart postgres
```

### Prisma errors?
```bash
cd apps/api

# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: deletes all data!)
npx prisma migrate reset

# Check database status
npx prisma studio
```

## 🧹 Clean Start

If you want to start fresh:

```bash
# Stop all containers
docker compose down

# Remove volumes (deletes database data)
docker compose down -v

# Clean node_modules
rm -rf node_modules apps/*/node_modules

# Reinstall and setup
npm install
./setup.sh
```

## 📚 Useful Commands

```bash
# View running containers
docker compose ps

# View container logs
docker compose logs -f

# Stop containers
docker compose stop

# Start containers
docker compose start

# Remove everything
docker compose down -v

# View database with Prisma Studio
cd apps/api && npx prisma studio

# Run database migrations
cd apps/api && npx prisma migrate dev

# Format code
npm run format

# Lint code
npm run lint
```

## 🎉 Next Steps

Once everything is running:

1. Open http://localhost:4000/api/docs to explore the API
2. Test authentication endpoints with provided credentials
3. Check out the frontend at http://localhost:3000
4. Start implementing features!

## 🆘 Still Having Issues?

1. Make sure Docker Desktop is running (check system tray/menu bar)
2. Restart Docker: `sudo systemctl restart docker`
3. Check logs: `docker compose logs`
4. Verify environment variables in `apps/api/.env`
5. Try the clean start procedure above

---

**Need help?** Contact the development team or check CLAUDE.md for detailed implementation guide.
