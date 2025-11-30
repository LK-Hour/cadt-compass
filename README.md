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

- Node.js 20+
- npm 10+
- PostgreSQL 15+ (or Docker)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cadt-compass
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL (using Docker):**
   ```bash
   docker-compose up -d
   ```

4. **Setup environment variables:**
   
   Frontend (`apps/web/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
   
   Backend (`apps/api/.env`):
   ```env
   DATABASE_URL="postgresql://cadt:compass@localhost:5432/cadt_compass"
   JWT_SECRET=your-secret-key-here
   ```

5. **Run database migrations:**
   ```bash
   cd apps/api
   npx prisma migrate dev
   npx prisma db seed
   ```

6. **Start development servers:**
   ```bash
   # From root directory
   npm run dev
   
   # Or individually:
   npm run dev:web    # Frontend: http://localhost:3000
   npm run dev:api    # Backend: http://localhost:4000
   ```

## 📝 Development Workflow

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
