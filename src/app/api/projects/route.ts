import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectsPath = path.join(process.cwd(), 'src/data/projects.json');
    
    // Check if file exists
    try {
      await fs.access(projectsPath);
    } catch {
      return NextResponse.json({ error: 'Projects data not found' }, { status: 404 });
    }
    
    // Read the file
    const projectsData = await fs.readFile(projectsPath, 'utf8');
    const projects = JSON.parse(projectsData);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}