# Cricket API Application

## Overview

This is a full-stack web application built with React and Express that serves cricket data through a REST API. The application uses a modern tech stack with TypeScript, Tailwind CSS, and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation resolvers

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: PostgreSQL-based sessions (connect-pg-simple)
- **API Design**: RESTful endpoints with proper error handling
- **Development**: Hot reloading with tsx

## Key Components

### Database Schema
The application defines three main database tables:
- **Users**: Basic user authentication with username/password
- **Fixtures**: Cricket match fixtures with opponent, date, and status
- **Matches**: Match results with scores and messages

### API Endpoints
- `GET /api/cricket-data`: Returns combined cricket data (fixtures and matches)
- `GET /api/health`: Health check endpoint
- `404 handler`: Proper error responses for unknown API routes

### Storage Layer
- **Interface**: `IStorage` defines the contract for data operations
- **Implementation**: `MemStorage` provides in-memory storage with static cricket data
- **Data Validation**: Zod schemas ensure type safety for API responses

### Frontend Features
- **Component System**: Comprehensive UI component library with consistent styling
- **Error Handling**: Global error boundary and toast notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode**: CSS variables support for theme switching

## Data Flow

1. **Request Flow**: Client makes API requests through TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Data Validation**: Zod schemas validate both input and output data
4. **Response**: Structured JSON responses with proper error handling
5. **Client Updates**: React Query manages caching and state updates

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL database
- **Drizzle Kit**: Database migrations and schema management

### UI Libraries
- **Radix UI**: Accessible component primitives
- **Lucide React**: Icon library
- **Tailwind CSS**: Utility-first CSS framework
- **Class Variance Authority**: Component variant management

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Static type checking
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds the React app to `dist/public`
2. **Backend**: ESBuild bundles the Express server to `dist/index.js`
3. **Database**: Drizzle migrations are applied via `npm run db:push`

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Uses `NODE_ENV=development` for development features
- **Production**: Serves static files and API from single Express server

### Development Workflow
- **Dev Server**: `npm run dev` starts both frontend and backend with hot reloading
- **Type Checking**: `npm run check` validates TypeScript across the project
- **Database**: Migrations are managed through Drizzle Kit

The application follows a monorepo structure with shared TypeScript types and schemas, enabling type safety across the full stack. The current implementation uses in-memory storage but is designed to easily transition to a PostgreSQL database when needed.