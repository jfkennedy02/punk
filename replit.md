# PUNK Token - Project Documentation

## Overview

This is a full-stack web application for "PUNK" - a vibrant, community-driven meme token built on the Solana blockchain. The application features a modern, animated landing page inspired by the explosive energy of Bonk and pumpfun, combining playful community spirit with seamless DeFi accessibility. The site showcases the token's character, community features, and tokenomics with dynamic animations and interactive elements.

## User Preferences

Preferred communication style: Simple, everyday language.
Interface preferences: Clean text-only design without emoji icons or symbols in professional sections.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (@tanstack/react-query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animation**: Custom CSS animations with floating particles and neon effects

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Storage**: PostgreSQL-based session storage with connect-pg-simple
- **Database Provider**: Neon Database (serverless PostgreSQL)

### Project Structure
The application follows a monorepo structure with clear separation:
- `client/` - Frontend React application
- `server/` - Express.js backend server
- `shared/` - Shared types, schemas, and utilities
- `migrations/` - Database migration files

## Key Components

### Frontend Components
1. **Landing Page Sections**:
   - Hero section with animated character and call-to-action buttons
   - Community section showcasing the club membership
   - Social media integration section
   - Interactive generator section
   - FAQ section with expandable content
   - Partners showcase section

2. **UI Components**: Comprehensive set of shadcn/ui components including buttons, cards, dialogs, forms, and navigation elements

3. **Interactive Elements**:
   - Floating particle animations
   - Sticky navigation header
   - Smooth scrolling between sections
   - Hover effects and neon glow animations

### Backend Components
1. **Storage Layer**: Abstracted storage interface with in-memory implementation for development
2. **Route Handlers**: Express.js routes with API prefix structure
3. **Development Tools**: Vite integration for hot module replacement in development

## Data Flow

### Database Schema
- **Users Table**: Basic user management with username and password fields
- **Schema Validation**: Zod schemas for type-safe data validation
- **Migrations**: Drizzle-kit for database schema management

### State Management
- React Query handles all server state with custom query functions
- Local component state for UI interactions
- Form state management with React Hook Form integration

## External Dependencies

### Core Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Library**: Radix UI primitives for accessible components
- **Styling**: Tailwind CSS with PostCSS processing
- **Development**: Replit-specific plugins for development environment

### Third-party Integrations
The landing page references external services and DeFi platforms:
- Solana blockchain infrastructure
- Jupiter for token swaps
- Pump.fun for token launch mechanics
- Raydium for DEX functionality
- DexScreener for price tracking
- CoinGecko for market data

### PUNK Token Details
- **Total Supply**: 1,000,000,000 tokens
- **Symbol**: $PUNK
- **Contract Address**: 5MM88hAZcY1cwZB2fFFe65JAuqwgrnMnogF6Lhmp1U1C
- **Blockchain**: Solana
- **Social Links**: 
  - Telegram: https://t.me/punkfuns
  - X (Twitter): https://x.com/punkfuns
  - Website: https://punkfuns.fun/

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend
- Express server with TypeScript compilation
- Replit-specific development tools and error handling
- Environment-based configuration

### Production Build
- Vite builds optimized frontend bundle
- esbuild compiles server-side TypeScript
- Static file serving from Express
- Database migrations handled via Drizzle commands

### Environment Configuration
- Database URL required for PostgreSQL connection
- Development vs production environment detection
- Replit-specific features enabled in development

### Build Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both frontend and backend
- `start`: Production server startup
- `db:push`: Database schema synchronization

The application is designed to run on Replit's platform with specific integrations for development tooling and deployment workflows.