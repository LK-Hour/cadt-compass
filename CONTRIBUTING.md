# Contributing to CADT Compass

Thank you for contributing to CADT Compass! This guide will help you get started with the development workflow.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Git Branching Strategy](#git-branching-strategy)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)

## 🚀 Getting Started

If you haven't set up the project yet, follow the [Quick Start guide](README.md#quick-start-for-team-members) in the README.

### Daily Workflow

```bash
# 1. Make sure you have the latest code
git checkout develop
git pull origin develop

# 2. Start the database
docker-compose up -d

# 3. Start the development servers
npm run dev
```

## 🌿 Git Branching Strategy

We use **Git Flow** with the following branches:

### Main Branches
- **`main`** - Production code (deployed to https://cadt-compass.vercel.app)
- **`develop`** - Development code (latest features, deployed to staging)

### Supporting Branches
- **`feature/*`** - New features
- **`fix/*`** - Bug fixes
- **`hotfix/*`** - Urgent production fixes

### Branch Naming Convention

```bash
feature/<your-name>/<short-description>
fix/<your-name>/<issue-description>
hotfix/<critical-issue>
```

**Examples:**
```bash
feature/virak/add-search-bar
feature/pranha/room-booking
fix/sakura/map-loading-bug
fix/kimhour/auth-token-expiry
hotfix/database-connection
```

## 🔄 Development Workflow

### 1. Create a Feature Branch

```bash
# Make sure you're on develop and have latest changes
git checkout develop
git pull origin develop

# Create your feature branch
git checkout -b feature/yourname/feature-description

# Example:
git checkout -b feature/virak/add-building-search
```

### 2. Make Your Changes

- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Update documentation if needed

### 3. Test Your Changes

```bash
# Run the app and test manually
npm run dev

# Run automated tests
npm run test

# Check for TypeScript errors
npm run type-check

# Check for linting issues
npm run lint
```

### 4. Commit Your Changes

```bash
# Check what files you changed
git status

# Add files to staging
git add .

# Or add specific files
git add apps/web/src/components/map/BuildingCard.tsx

# Commit with a clear message (see Commit Guidelines below)
git commit -m "feat: add search functionality to buildings page"
```

### 5. Push to GitHub

```bash
# Push your branch to GitHub
git push origin feature/yourname/feature-description

# If it's your first push of this branch
git push -u origin feature/yourname/feature-description
```

### 6. Create a Pull Request

1. Go to GitHub: https://github.com/LK-Hour/cadt-compass
2. Click **"Compare & pull request"**
3. Set **base branch** to `develop`
4. Fill in the PR template:
   - **Title:** Clear description of what you did
   - **Description:** What changes you made and why
   - **Screenshots:** If UI changes, add before/after screenshots
5. Request review from team lead (Kimhour)
6. Click **"Create pull request"**

## 📝 Commit Guidelines

We follow **Conventional Commits** for clear git history.

### Commit Message Format

```
<type>: <description>

[optional body]
[optional footer]
```

### Types

- **feat:** New feature
  ```bash
  git commit -m "feat: add search bar to map page"
  ```

- **fix:** Bug fix
  ```bash
  git commit -m "fix: resolve login button not working"
  ```

- **style:** Code style changes (formatting, semicolons, etc.)
  ```bash
  git commit -m "style: format auth components with prettier"
  ```

- **refactor:** Code refactoring (no functionality change)
  ```bash
  git commit -m "refactor: simplify map marker logic"
  ```

- **docs:** Documentation changes
  ```bash
  git commit -m "docs: update API documentation"
  ```

- **test:** Adding or updating tests
  ```bash
  git commit -m "test: add unit tests for auth service"
  ```

- **chore:** Maintenance tasks
  ```bash
  git commit -m "chore: update dependencies"
  ```

### Good Commit Examples

✅ **Good:**
```bash
git commit -m "feat: add room availability filter"
git commit -m "fix: resolve map markers not showing on mobile"
git commit -m "refactor: extract calendar logic to custom hook"
```

❌ **Bad:**
```bash
git commit -m "update"
git commit -m "fix stuff"
git commit -m "changes"
git commit -m "asdfasdf"
```

### Commit Body (Optional)

For complex changes, add more details:

```bash
git commit -m "feat: add real-time room availability

- Implemented WebSocket connection for live updates
- Added loading states and error handling
- Updated UI to show occupancy status
- Tested with 100+ concurrent users"
```

## 🔍 Pull Request Process

### Before Creating PR

- [ ] Code runs without errors
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No console.log statements left in code
- [ ] Code follows project style
- [ ] Updated documentation if needed

### PR Template

```markdown
## 📋 Description
Brief description of what this PR does.

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## 🧪 Testing
How did you test this?

## 📸 Screenshots (if applicable)
Before/after screenshots for UI changes

## ✅ Checklist
- [ ] My code follows the project style
- [ ] I have tested my changes
- [ ] I have updated the documentation
- [ ] All tests pass
```

### PR Review Process

1. **Team lead reviews** your PR
2. **Address feedback** if requested:
   ```bash
   # Make changes on your branch
   git add .
   git commit -m "fix: address PR feedback"
   git push origin feature/yourname/feature-description
   ```
3. **Approval** - Team lead approves PR
4. **Merge** - Team lead merges to develop

## 🎨 Code Style

### TypeScript/JavaScript

```typescript
// ✅ Good: Clear variable names, proper typing
const fetchAvailableRooms = async (buildingId: string): Promise<Room[]> => {
  try {
    const response = await api.get(`/rooms/available/${buildingId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    throw error;
  }
};

// ❌ Bad: Unclear names, no error handling
const f = async (id) => {
  const r = await api.get(`/rooms/available/${id}`);
  return r.data;
};
```

### React Components

```typescript
// ✅ Good: Typed props, clear component structure
interface BuildingCardProps {
  building: Building;
  onSelect: (id: string) => void;
}

export function BuildingCard({ building, onSelect }: BuildingCardProps) {
  return (
    <Card onClick={() => onSelect(building.id)}>
      <CardHeader>
        <CardTitle>{building.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{building.description}</p>
      </CardContent>
    </Card>
  );
}
```

### File Organization

```
components/
  ├── layout/           # Layout components (Navbar, Footer)
  ├── map/              # Map-related components
  ├── auth/             # Authentication components
  └── ui/               # Reusable UI components (shadcn/ui)
```

### Naming Conventions

- **Components:** PascalCase - `BuildingCard.tsx`
- **Functions:** camelCase - `fetchBuildings()`
- **Constants:** UPPER_SNAKE_CASE - `API_BASE_URL`
- **Files:** kebab-case or PascalCase - `building-card.tsx` or `BuildingCard.tsx`

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests for specific workspace
npm run test --workspace=apps/web
npm run test --workspace=apps/api
```

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import { BuildingCard } from './BuildingCard';

describe('BuildingCard', () => {
  it('renders building name', () => {
    const building = { id: '1', name: 'E Building' };
    render(<BuildingCard building={building} onSelect={() => {}} />);
    
    expect(screen.getByText('E Building')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = jest.fn();
    const building = { id: '1', name: 'E Building' };
    render(<BuildingCard building={building} onSelect={onSelect} />);
    
    screen.getByText('E Building').click();
    expect(onSelect).toHaveBeenCalledWith('1');
  });
});
```

## 🐛 Debugging Tips

### Common Issues

**Port already in use:**
```bash
# Find what's using the port
lsof -i :3000
lsof -i :4000

# Kill the process
kill -9 <PID>
```

**Database connection issues:**
```bash
# Check if Docker is running
docker ps

# Restart database
docker-compose down
docker-compose up -d

# Reset database
docker-compose down -v
docker-compose up -d
cd apps/api
npx prisma migrate dev
npx prisma db seed
```

**Dependencies out of sync:**
```bash
# Clean install
rm -rf node_modules package-lock.json
rm -rf apps/*/node_modules apps/*/package-lock.json
npm install
```

## 📞 Getting Help

If you're stuck:

1. **Check the documentation** - README.md, API.md, SETUP.md
2. **Ask the team** - Team chat or during daily standup
3. **Contact team lead** - Loem Kimhour (Backend) or Heak An (PM)

## 🎯 Quick Reference

```bash
# Daily workflow
git checkout develop && git pull
docker-compose up -d
npm run dev

# Create feature
git checkout -b feature/name/description

# Commit changes
git add .
git commit -m "type: description"
git push origin feature/name/description

# Update from develop
git checkout develop && git pull
git checkout feature/name/description
git merge develop

# Clean up after merge
git branch -d feature/name/description
git push origin --delete feature/name/description
```

---

**Happy Coding! 🚀**

Built with ❤️ by CADT Compass Team
