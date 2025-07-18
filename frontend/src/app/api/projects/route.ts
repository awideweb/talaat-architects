import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Try multiple possible paths for the projects.json file
    const possiblePaths = [
      path.join(process.cwd(), 'src/data/projects.json'),
      path.join(process.cwd(), 'frontend/src/data/projects.json'),
      path.join(process.cwd(), '../frontend/src/data/projects.json'),
      path.join(__dirname, '../../data/projects.json'),
    ];
    
    let projectsData: string | undefined;
    let projectsPath: string | undefined;
    
    // Try each path until we find the file
    for (const tryPath of possiblePaths) {
      try {
        await fs.access(tryPath);
        projectsData = await fs.readFile(tryPath, 'utf8');
        projectsPath = tryPath;
        break;
      } catch {
        continue;
      }
    }
    
    if (!projectsData) {
      console.error('Projects data not found at any of these paths:', possiblePaths);
      return NextResponse.json({ error: 'Projects data not found' }, { status: 404 });
    }
    
    const projects = JSON.parse(projectsData);
    console.log(`Successfully loaded ${projects.length} projects from ${projectsPath}`);
    
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}