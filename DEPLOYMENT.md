# Deployment Guide - Talaat Architects Website

## Prerequisites

Before deploying to Vercel, ensure you have:

1. **Vercel account** - Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** - Install globally: `npm install -g vercel`
3. **Git repository** - Your code should be in a Git repository (GitHub, GitLab, etc.)

## Local Production Testing

Before deploying, test the production build locally:

```bash
# Build the project
npm run build:production

# Start the production server
cd frontend && npm start

# Test the API endpoints
curl http://localhost:3000/api/health
curl http://localhost:3000/api/projects
```

## Environment Variables

### Development (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

### Production (.env.production)
```
NEXT_PUBLIC_API_URL=
NODE_ENV=production
```

## Vercel Deployment Options

### Option 1: Deploy via Git (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Connect your GitHub/GitLab repository
   - Select the `talaat-architects` project

2. **Configure Build Settings**
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

3. **Environment Variables**
   - Leave `NEXT_PUBLIC_API_URL` empty (will use same domain)
   - Set `NODE_ENV=production`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically

### Option 2: Deploy via CLI

```bash
# Login to Vercel
vercel login

# Deploy from the frontend directory
cd frontend
vercel --prod

# Or deploy from root using the script
npm run deploy:vercel
```

## Build Process

The automated build process:

1. **Content Processing** (`npm run build:content`)
   - Processes images from `Talaat Studio_Website/CONTENT/`
   - Generates optimized images and thumbnails
   - Creates `frontend/src/data/projects.json`

2. **Next.js Build** (`npm run build`)
   - Compiles TypeScript
   - Optimizes code and images
   - Generates static pages
   - Creates API routes

## Project Structure for Deployment

```
talaat-architects/
├── frontend/                 # Next.js app (deployed to Vercel)
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # React components
│   │   ├── data/            # Generated projects data
│   │   └── ...
│   ├── public/              # Static assets
│   │   └── projects/        # Generated project images
│   └── next.config.js       # Next.js configuration
├── scripts/                 # Build scripts
└── vercel.json              # Vercel configuration
```

## Vercel Configuration

The `vercel.json` file is configured to:
- Deploy the Next.js app from the `frontend` directory
- Handle API routes within the Next.js app
- Set proper routing for the application

## Domain Configuration

### Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain (e.g., `talaat-architects.com`)

2. **Configure DNS**
   - Add CNAME record pointing to your Vercel deployment
   - Or use A record with Vercel's IP addresses

## Content Management

### Adding New Projects

1. **Add Project Directory**
   - Create new folder in `Talaat Studio_Website/CONTENT/3_RESIDENTIAL/` or `6_UNBUILT (ARCHIVE)/`
   - Add project images to the folder

2. **Add Project Metadata (Optional)**
   - Create `project.md` file with frontmatter:
   ```markdown
   ---
   title: "Project Name"
   description: "Project description"
   year: 2024
   location: "City, State"
   ---
   ```

3. **Rebuild and Deploy**
   ```bash
   npm run build:production
   git add .
   git commit -m "Add new project"
   git push origin main
   ```

### Automated Deployment

When connected to Git, Vercel will automatically:
- Deploy on every push to `main` branch
- Run the build process
- Update the live site

## Performance Optimization

The site includes:
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Static Generation**: Pre-built pages for faster loading
- **Code Splitting**: Automatic JavaScript bundling
- **Caching**: Proper cache headers for static assets

## Monitoring and Analytics

### Vercel Analytics
- Enable in Project Settings → Analytics
- Provides page views, performance metrics

### Performance Monitoring
- Use Vercel's built-in performance monitoring
- Check Core Web Vitals in the dashboard

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all TypeScript errors are resolved
   - Ensure all dependencies are installed
   - Verify image processing completed successfully

2. **API Routes Not Working**
   - Ensure API routes are in `frontend/src/app/api/`
   - Check that `projects.json` exists in `frontend/src/data/`

3. **Images Not Loading**
   - Verify images are in `frontend/public/projects/`
   - Check image paths in the generated JSON data

### Debug Commands

```bash
# Check build status
npm run build:production

# Verify generated data
cat frontend/src/data/projects.json | jq '.[] | .title'

# Test API locally
curl http://localhost:3000/api/projects | jq '.'
```

## Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Check GitHub repository for updates

## Security Notes

- All environment variables are configured for production
- No sensitive data is exposed in the client-side code
- Images are optimized and served securely
- API routes are serverless and automatically scaled