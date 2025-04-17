# CLAUDE.md - Guide for Agentic Coding Assistants

## Build & Development Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Run production build
- `pnpm lint` - Run ESLint checks

## Code Style Guidelines
- **Types**: Use strict TypeScript (`strict: true` in tsconfig)
- **Imports**: Use `@/*` alias for src directory imports
- **Formatting**: Follow Next.js/ESLint core-web-vitals and TypeScript standards
- **Components**: Use React 19 features with function components
- **File Structure**: Follow Next.js App Router conventions
- **Errors**: Use proper TypeScript error handling, avoid `any` types
- **Naming**: Use descriptive camelCase for variables/functions, PascalCase for components/types
- **CSS**: Use Tailwind CSS via `@tailwindcss/postcss` plugin

## Technology Stack
- Next.js 15.3.0 with App Router
- React 19.0.0
- TypeScript 5+
- Tailwind CSS 4+
- ESLint 9+