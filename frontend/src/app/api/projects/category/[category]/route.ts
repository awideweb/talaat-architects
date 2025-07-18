import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string }> }
) {
  try {
    const { category } = await params;
    
    // Try multiple possible paths for the projects.json file
    const possiblePaths = [
      path.join(process.cwd(), 'src/data/projects.json'),
      path.join(process.cwd(), 'frontend/src/data/projects.json'),
      path.join(process.cwd(), '../frontend/src/data/projects.json'),
      path.join(__dirname, '../../data/projects.json'),
    ];
    
    let projectsData: string | undefined;
    
    // Try each path until we find the file
    for (const tryPath of possiblePaths) {
      try {
        await fs.access(tryPath);
        projectsData = await fs.readFile(tryPath, 'utf8');
        break;
      } catch {
        continue;
      }
    }
    
    if (!projectsData) {
      return NextResponse.json({ error: 'Projects data not found' }, { status: 404 });
    }
    
    const projects = JSON.parse(projectsData);
    const filteredProjects = projects.filter((p: { category: string }) => p.category === category);
    
    return NextResponse.json(filteredProjects);
  } catch (error) {
    console.error('Error loading projects by category:', error);
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 });
  }
}