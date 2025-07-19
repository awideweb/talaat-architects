# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

TALAAT STUDIO is a modern architectural portfolio website built with Next.js 15 and a sophisticated automated content management system. It transforms image directories into optimized project portfolios without requiring manual database management.

## Architecture

### Full-Stack Structure
- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS 4.0 alpha, and Framer Motion
- **Backend**: Dual approach - Express.js for development + Next.js API routes for production
- **Content Processing**: Automated image processing pipeline using Sharp with WebP/AVIF optimization
- **Deployment**: Vercel with serverless functions and 30-second API timeouts

### Key Components
- **Content Processor**: Automatically scans project directories and generates optimized images with thumbnails
- **Dynamic Project Pages**: Server-side rendered project pages with image galleries
- **Landing Animation**: Session-based landing page with smooth transitions
- **Hero Slideshow**: Configurable image slideshow with auto-advance functionality

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Process content from source directories (required after image changes)
npm run content:process

# Development with Turbopack (fastest)
npm run dev

# Build for production
npm run build

# Production build with linting
npm run build:production

# Full production build (content processing + build + lint)
npm run build:full

# Deploy to Vercel
npm run deploy:vercel

# Start production server
npm start
```

### Linting and Quality
```bash
# ESLint check
npm run lint

# Fix ESLint issues
npm run lint:fix

# Type checking
npm run type-check
```

## Content Processing System

The content processor (`scripts/process-content.js`) automatically:
1. Scans residential and unbuilt project directories
2. Processes and optimizes images using Sharp (1920x1080 max, 85% quality)
3. Generates thumbnails with consistent sizing (600x400)
4. Creates project metadata in `src/data/projects.json`
5. Outputs processed images to `public/projects/`
6. Handles markdown frontmatter for project descriptions

### Project Structure Expected
```
content/
├── residential/             # Residential projects
│   ├── 1wilson-lane/
│   ├── 2springvale-road/
│   ├── 3watermill-lane/
│   ├── 4wapakoneta-road/
│   ├── 5wolf-run/
│   ├── 6kiawah/
│   └── 7riverbend/
└── unbuilt/                 # Unbuilt projects
    ├── community-for-the-homeless/
    ├── iceland-cave-tower/
    ├── kiwi-meditation-cabin/
    ├── metsa-library/
    └── micro-home/
```

## Key Configuration Files

- `vercel.json`: Deployment configuration with API routing and 30-second timeouts
- `next.config.js`: Next.js configuration with image optimization and development API rewrites
- `tailwind.config.js`: Tailwind CSS 4.0 alpha configuration with custom color variables
- `src/config/hero-images.ts`: Hero slideshow configuration
- `src/data/projects.json`: Auto-generated project data (do not edit manually)

## Development Workflow

1. **Adding New Projects**: Place images in `content/residential/` or `content/unbuilt/` directories, run `npm run content:process`
2. **Hero Images**: Update `src/config/hero-images.ts` to modify slideshow
3. **Styling**: Use Tailwind CSS 4.0 alpha with custom configurations in `tailwind.config.js`
4. **API Development**: Next.js API routes in `src/app/api/` (production) or Express.js in `backend/` (development)
5. **Component Development**: Use TypeScript with strict typing, components in `src/components/`

## Production Deployment

The application is configured for Vercel deployment with:
- Automatic builds on git push
- Serverless functions for API endpoints
- Static file serving for optimized images
- Environment-specific configurations

Always run `npm run build:full` before deployment to ensure content processing, linting, and builds all pass.

## Key Architecture Notes

### Session-Based Landing Page
The landing animation shows once per browser session using `sessionStorage`, providing a smooth first-time user experience without repetitive animations.

### Dual API Architecture
- **Development**: Express.js server (`backend/index.js`) with hot reloading
- **Production**: Next.js API routes (`src/app/api/`) as Vercel serverless functions

### Image Processing Pipeline
The ContentProcessor class handles the complete image workflow from raw uploads to optimized web delivery, supporting WebP/AVIF formats with automatic fallbacks.

### Zero-Database Design
All content is managed through the file system with generated JSON metadata, eliminating database dependencies while maintaining full CMS capabilities.