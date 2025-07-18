# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

TALAAT STUDIO is a modern architectural portfolio website built with Next.js and Node.js. It features automated content generation from image directories, creating a seamless content management system for architectural projects.

## Architecture

### Full-Stack Structure
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, and Framer Motion
- **Backend**: Express.js API server for development
- **Content Processing**: Automated image processing and project generation system
- **Deployment**: Vercel with serverless functions

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

# Development (starts both frontend and backend)
npm run dev

# Frontend only
npm run dev:frontend

# Backend only  
npm run dev:backend

# Build for production
npm run build

# Production build with linting
npm run build:production

# Start production server
npm start
```

### Content Management
```bash
# Process new project images and generate thumbnails
npm run content:process

# Build content for deployment
npm run build:content
```

### Frontend-Specific Commands
```bash
cd frontend
npm run lint          # ESLint check
npm run build         # Next.js build
npm run export        # Static export
```

## Content Processing System

The content processor (`scripts/process-content.js`) automatically:
1. Scans residential and unbuilt project directories
2. Processes and optimizes images using Sharp
3. Generates thumbnails with consistent sizing
4. Creates project metadata in `frontend/src/data/projects.json`
5. Handles markdown frontmatter for project descriptions

### Project Structure Expected
```
../Talaat Studio_Website/CONTENT/
├── 3_RESIDENTIAL/           # Residential projects
│   ├── 1wilson-lane/
│   ├── 2springvale-road/
│   └── ...
└── 6_UNBUILT (ARCHIVE)/     # Unbuilt projects
    ├── community-for-the-homeless/
    ├── iceland-cave-tower/
    └── ...
```

## Key Configuration Files

- `vercel.json`: Deployment configuration with API routing
- `frontend/src/config/hero-images.ts`: Hero slideshow configuration
- `frontend/src/data/projects.json`: Auto-generated project data (do not edit manually)

## Development Workflow

1. **Adding New Projects**: Place images in appropriate source directories, run `npm run content:process`
2. **Hero Images**: Update `frontend/src/config/hero-images.ts` to modify slideshow
3. **Styling**: Use Tailwind CSS with custom configurations in `tailwind.config.js`
4. **API Development**: Backend routes in `backend/index.js`, frontend API routes in `frontend/src/app/api/`

## Production Deployment

The application is configured for Vercel deployment with:
- Automatic builds on git push
- Serverless functions for API endpoints
- Static file serving for optimized images
- Environment-specific configurations

Always run `npm run build:production` before deployment to ensure linting passes and content is properly processed.