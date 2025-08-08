# Overview

This is a community support services directory application that helps users find local assistance services like food pantries, shelters, healthcare, and employment resources. The application provides a searchable interface with category filtering, location-based results, and emergency contact functionality. It's built as a full-stack web application with a React frontend and Express.js backend, designed to serve vulnerable populations seeking community assistance.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React 18** with TypeScript for the main UI framework
- **Vite** as the build tool and development server with hot module replacement
- **Wouter** for client-side routing instead of React Router for lighter bundle size
- **TanStack Query** for server state management, API caching, and data synchronization
- **Tailwind CSS** with **shadcn/ui** components for consistent, accessible design system
- **Radix UI** primitives underlying the component system for accessibility compliance

## Backend Architecture  
- **Express.js** with TypeScript for the REST API server
- **In-memory storage** with seeded sample data for service information
- RESTful API design with endpoints for service retrieval, search, and category filtering
- Custom middleware for request logging and error handling
- Built-in Vite integration for serving static assets in development

## Data Storage
- **Drizzle ORM** configured for PostgreSQL with schema definitions in shared directory
- Database schema supports services with categories, locations, contact info, and operational status
- Currently using in-memory storage with sample data for development
- Migration system configured for production database deployment

## Authentication & Authorization
- No authentication system currently implemented
- Application designed for anonymous public access to service information

## UI/UX Design Decisions
- **Mobile-first responsive design** optimized for smartphone usage
- **Emergency contact floating action button** prominently displayed for crisis situations  
- **Category-based filtering** with visual icons for easy navigation
- **Search functionality** with real-time results
- **Location-aware interface** showing distance and mapping integration ready
- **High contrast colors** and accessible design for users with disabilities

## External Dependencies
- **Neon Database** (@neondatabase/serverless) for PostgreSQL hosting
- **Radix UI** component primitives for accessibility-compliant UI elements
- **Tailwind CSS** for utility-first styling approach
- **TanStack Query** for robust data fetching and caching
- **Drizzle ORM** with Zod integration for type-safe database operations
- **Embla Carousel** for swipeable content sections
- **Date-fns** for date manipulation and formatting
- **Class Variance Authority** for dynamic component styling
- **Vite plugins** including runtime error overlay and development tooling