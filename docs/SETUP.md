# CADT Compass - Development Setup Guide

This guide will help you set up the CADT Compass project on your local machine for development.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 20+** - [Download](https://nodejs.org/)
- **npm 10+** (comes with Node.js)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

## Step 1: Clone the Repository

```bash
cd "/home/hour/Documents/CADT/Projcet Management"
# If starting fresh with Git:
# git init
# git add .
# git commit -m "Initial commit: Project foundation"
```

## Step 2: Install Dependencies

Install all dependencies for the monorepo (frontend, backend, and shared packages):

```bash
cd cadt-compass
npm install
```

This will install dependencies for:

- Root workspace
- Frontend (Next.js)
- Backend (NestJS)
- Shared types package

## Step 3: Setup PostgreSQL Database

### Option A: Using Docker (Recommended)

Start the PostgreSQL container:

```bash
docker-compose up -d
```

Verify the container is running:

```bash
docker ps
```

You should see `cadt-compass-db` running on port 5432.

### Option B: Local PostgreSQL Installation

If you prefer to install PostgreSQL locally:

1. Install PostgreSQL 15+
2. Create a database named `cadt_compass`
3. Create a user `cadt` with password `compass`
4. Update `apps/api/.env` if using different credentials

## Step 4: Configure Environment Variables

### Backend Environment

The `.env` file should already exist (copied from `.env.example`). Verify it contains:

```bash
cat apps/api/.env
```

Should show:

```env
DATABASE_URL="postgresql://cadt:compass@localhost:5432/cadt_compass?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"
PORT=4000
NODE_ENV="development"
```

✅ **For production, change the JWT_SECRET to a strong random string!**

### Frontend Environment

Create `apps/web/.env.local`:

```bash
cat > apps/web/.env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:4000
EOF
```

## Step 5: Setup Database

Navigate to the backend directory:

```bash
cd apps/api
```

### Generate Prisma Client

```bash
npm run prisma:generate
```

This generates the TypeScript types for database models.

### Run Migrations

```bash
npm run prisma:migrate
```

When prompted for a migration name, enter: `initial_setup`

This creates all database tables:

- users
- buildings
- rooms
- pois
- events
- event_registrations
- feedbacks

### Seed the Database

Populate the database with sample data:

```bash
npm run prisma:seed
```

This creates:

- 2 test users (admin and student)
- 3 buildings (A, B, C)
- 8 rooms
- 7 POIs
- 3 events

## Step 6: Verify Database Setup

Open Prisma Studio to explore the data:

```bash
npm run prisma:studio
```

This opens a GUI at `http://localhost:5555` where you can:

- View all tables
- Browse seeded data
- Edit records
- Test queries

## Step 7: Start Development Servers

### Option A: Start Both Servers (Recommended)

From the **root directory**:

```bash
cd ../..  # Go back to root
npm run dev
```

This starts:

- **Frontend** at `http://localhost:3000`
- **Backend** at `http://localhost:4000`

### Option B: Start Individually

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

## Step 8: Verify Setup

### Test Backend API

Open your browser or use curl:

```bash
# Health check (when API is running)
curl http://localhost:4000

# Check if NestJS is running
# You should see a response or error (routes not implemented yet)
```

### Test Frontend

Open your browser:

```
http://localhost:3000
```

You should see the Next.js default page.

## Common Issues & Troubleshooting

### Issue 1: Docker PostgreSQL Not Starting

**Error:** Port 5432 already in use

**Solution:**

```bash
# Check what's using port 5432
lsof -i :5432

# Stop existing PostgreSQL service
sudo systemctl stop postgresql

# Or kill the process
kill -9 <PID>

# Restart Docker container
docker-compose down
docker-compose up -d
```

### Issue 2: Prisma Client Not Found

**Error:** `Cannot find module '@prisma/client'`

**Solution:**

```bash
cd apps/api
npm run prisma:generate
```

### Issue 3: Migration Fails

**Error:** Database connection refused

**Solution:**

1. Verify PostgreSQL is running: `docker ps`
2. Check database credentials in `.env`
3. Test connection:

```bash
psql -h localhost -U cadt -d cadt_compass
# Password: compass
```

### Issue 4: Seed Script Fails

**Error:** `Module not found: PrismaClient`

**Solution:**

```bash
# Generate Prisma client first
npm run prisma:generate

# Then run seed
npm run prisma:seed
```

### Issue 5: Frontend Can't Connect to Backend

**Error:** Network error when calling API

**Solution:**

1. Verify backend is running on port 4000
2. Check `NEXT_PUBLIC_API_URL` in `apps/web/.env.local`
3. Check for CORS issues (will be configured in backend)

## Development Workflow

### Daily Workflow

1. **Start the day:**

   ```bash
   docker-compose up -d          # Start database
   npm run dev                   # Start dev servers
   ```

2. **Make changes:**
   - Edit code in `apps/web/` or `apps/api/`
   - Changes auto-reload with hot reload

3. **End of day:**
   ```bash
   git add .
   git commit -m "feat: description of changes"
   git push
   ```

### Database Changes

When you modify `prisma/schema.prisma`:

```bash
cd apps/api

# Create migration
npm run prisma:migrate

# Regenerate client
npm run prisma:generate
```

### Adding New Dependencies

**Frontend:**

```bash
cd apps/web
npm install <package-name>
```

**Backend:**

```bash
cd apps/api
npm install <package-name>
```

**Root (shared):**

```bash
npm install <package-name> -w
```

## IDE Setup (VS Code)

### Recommended Extensions

Install these VS Code extensions:

- ESLint
- Prettier
- Prisma
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin (Volar)

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true
}
```

## Testing

### Run All Tests

```bash
npm run test
```

### Run Backend Tests Only

```bash
cd apps/api
npm run test
```

### Run Frontend Tests Only

```bash
cd apps/web
npm run test
```

## Next Steps

Now that your development environment is set up:

1. **Backend Developers:**
   - Start building API modules in `apps/api/src/modules/`
   - Follow the [API Design](../CLAUDE.md#5-api-design) section

2. **Frontend Developers:**
   - Build UI components in `apps/web/src/components/`
   - Follow the [Design Guidelines](../CLAUDE.md#9-design-guidelines)

3. **Database Engineer:**
   - Optimize queries and indexes
   - Monitor database performance

4. **QA Engineer:**
   - Setup testing framework
   - Write test cases

## Useful Commands

```bash
# Root level
npm run dev              # Start all dev servers
npm run build            # Build all projects
npm run test             # Run all tests
npm run lint             # Lint all projects

# Backend (apps/api)
npm run start:dev        # Start with hot reload
npm run build            # Build for production
npm run prisma:studio    # Open Prisma Studio
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations

# Frontend (apps/web)
npm run dev              # Start Next.js dev server
npm run build            # Build for production
npm run start            # Start production server
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Leaflet](https://react-leaflet.js.org)

---

**Need Help?**

- Check the [README.md](../README.md)
- Review the [Implementation Guide](../CLAUDE.md)
- Ask the team in Discord/Slack
- Open an issue on GitHub

Happy coding! 🚀
