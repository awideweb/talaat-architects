import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // When running in Next.js, process.cwd() points to the frontend directory
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    
    console.log('Looking for projects.json at:', projectsPath);
    console.log('Current working directory:', process.cwd());
    
    // Check if file exists
    try {
      await fs.access(projectsPath);
    } catch {
      console.error('Projects data not found at:', projectsPath);
      return NextResponse.json({ error: 'Projects data not found' }, { status: 404 });
    }
    
    // Read the file
    const projectsData = await fs.readFile(projectsPath, 'utf8');
    const projects = JSON.parse(projectsData);
    
    console.log(`Successfully loaded ${projects.length} projects from ${projectsPath}`);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}