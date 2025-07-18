# Talaat Architects Website

A modern, responsive website for Talaat Architects featuring auto-generated project portfolios from directory-based content management.

## Features

- **Animated Landing Page**: Custom GIF-based landing page with smooth fade transition to homepage
- **Hamburger Menu Navigation**: Elegant floating hamburger menu in top center with dropdown navigation
- **Auto-generated Projects**: Automatically processes image directories and markdown files to create project portfolios
- **Modern Design**: Clean, minimalist design inspired by contemporary architectural websites
- **Responsive Layout**: Fully responsive design that works on all devices
- **Smooth Animations**: Framer Motion animations for enhanced user experience
- **Image Optimization**: Automatic image processing and optimization with Sharp
- **Content Management**: File-system based content management (no database required)
- **Session Management**: Smart landing page display (shows once per session)

## Project Structure

```
talaat-architects/
├── backend/           # Node.js Express API
├── frontend/          # Next.js React application
├── scripts/           # Build and content processing scripts
├── content/           # Auto-generated from existing image directories
└── package.json       # Root project configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Process content from existing image directories:
   ```bash
   npm run content:process
   ```

4. Start the development servers:
   ```bash
   npm run dev
   ```

This will start:
- Backend API server on `http://localhost:3001`
- Frontend Next.js app on `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## Content Management

The website automatically generates project portfolios from your existing image directories. The content processor:

1. Scans residential projects in `../Talaat Studio_Website/CONTENT/3_RESIDENTIAL/`
2. Scans unbuilt projects in `../Talaat Studio_Website/CONTENT/6_UNBUILT (ARCHIVE)/`
3. Processes and optimizes all images
4. Generates thumbnails
5. Creates project metadata
6. Saves everything to `frontend/src/data/projects.json`

### Adding New Projects

Simply add new project directories with images to the source content folders and run:
```bash
npm run content:process
```

### Project Markdown Files

Add a `.md` file to any project directory to include metadata:

```markdown
---
title: "Custom Project Title"
description: "Project description goes here"
year: 2023
location: "City, State"
---

Additional project details...
```

## API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/projects/:slug` - Get specific project
- `GET /api/projects/category/:category` - Get projects by category
- `GET /api/health` - Health check

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **Image Processing**: Sharp
- **Content**: Markdown with Gray Matter
- **Development**: Concurrently for parallel dev servers

## Development

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only frontend
- `npm run dev:backend` - Start only backend
- `npm run content:process` - Process content from source directories
- `npm run build` - Build for production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

ISC License