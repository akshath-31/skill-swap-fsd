# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🛠️ Development Commands

### Frontend (React/Vite)
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview build: `npm run preview`
- Lint code: `npm run lint`
- Run tests: `npm run test`
- Watch tests: `npm run test:watch`

### Backend (Node/Express)
From `server/` directory:
- Install deps: `npm install`
- Start dev server: `npm run dev`
- Lint backend: Use root `npm run lint` (eslint config covers both)

### Full-stack Development
Run both frontend and backend simultaneously:
```bash
# In one terminal (root):
npm run dev

# In another terminal (server/):
npm run dev
```

## 🏗️ Project Architecture

### High-Level Structure
```
skill-swap-fsd/
├── src/                 # Frontend React application
│   ├── components/      # Reusable UI components (Radix-based)
│   ├── contexts/        # React contexts (Auth, Data)
│   ├── lib/             # API service clients
│   └── pages/           # Page components (Learn, Teach, Credits)
├── server/              # Backend Express API
│   ├── models/          # Mongoose schemas
│   ├── .env.example     # Environment template
│   └── index.ts         # Server entry point
└── package.json         # Root scripts & dependencies
```

### Key Technical Decisions
- **Frontend**: React 18 + Vite + TypeScript for fast development
- **UI Library**: @radix-ui primitives for accessible, unstyled components
- **Styling**: Tailwind CSS utility-first approach
- **State Management**: React Query for server state, Context for auth/UI state
- **Backend**: Node.js + Express REST API
- **Database**: MongoDB + Mongoose ODM
- **Authentication**: Firebase Auth (Google/Email) with automatic MongoDB user sync
- **Credit System**: Transaction tracking in MongoDB with real-time balance updates

### Data Flow
1. Firebase handles authentication
2. On first login, backend syncs Firebase UID → MongoDB user document
3. Frontend uses React Query to fetch/update data via REST endpoints
4. Skill transactions update both user credits and transaction history
5. Real-time balance updates via React Query invalidation

## 📝 Coding Standards

### TypeScript
- Strict mode enabled in `tsconfig.json`
- Interface over type for object shapes
- Avoid `any`; use generics for reusable components

### React Components
- Use functional components with hooks
- Export named components (default for page routes)
- Component files: PascalCase (e.g., `SkillCard.tsx`)
- Hooks: `use` prefix (e.g., `useAuth.ts`)

### Styling
- Tailwind utility classes in JSX
- Custom CSS in `globals.css` only for base styles
- Responsive design: mobile-first breakpoints

### Backend
- Express route handlers async/await
- Mongoose models in `server/models/`
- Error handling via try/catch with centralized middleware
- Validation using Zod schemas (shared with frontend where applicable)

## 🔧 Common Tasks

### Adding a New Feature
1. Design API endpoints in `server/models/` if needed
2. Create/update Mongoose schema
3. Implement controller logic in route handlers
4. Add React Query hooks in `src/lib/` if complex data fetching
5. Create UI components in `src/components/`
6. Add page route in `src/pages/` or extend existing pages
7. Update React Query keys for proper caching/invalidation

### Modifying Existing Components
- Check if component uses Context or React Query for data
- Follow existing patterns for state updates
- Ensure proper TypeScript types are maintained
- Test with both empty and populated data states

### Database Changes
1. Update Mongoose schema in `server/models/`
2. Migrate existing data if structural change
3. Update corresponding API endpoints
4. Adjust React Query hooks if response shape changes
5. Update any dependent UI components

## 🧪 Testing Strategy
- Unit tests: Vitest + React Testing Library
- Test files: `*.test.ts` alongside source
- Mock API calls with `msw` or manual mocks
- Focus on user interactions and data flow
- Run tests before committing: `npm run test`

## 🔒 Security Practices
- Never commit `.env` files (gitignored)
- Environment variables loaded via `dotenv` in backend
- Firebase config exposed only to frontend (limited permissions)
- Passwords handled by Firebase (no storage in MongoDB)
- Input validation on both frontend (Zod) and backend (Mongoose/Zod)
- CORS configured to allow frontend origin only

## 📚 Documentation
- Keep this CLAUDE.md updated with significant architectural changes
- Update README.md for user-facing changes
- Document complex business logic in code comments
- Maintain `.env.example` with required variables

This guide will help future Claude Code instances quickly understand the codebase conventions, run the application properly, and make changes that align with established patterns. Refer to it before starting new tasks to ensure consistency.