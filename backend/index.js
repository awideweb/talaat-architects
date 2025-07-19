const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projectsPath = path.join(__dirname, '../src/data/projects.json');
    
    if (!await fs.pathExists(projectsPath)) {
      return res.status(404).json({ error: 'Projects data not found' });
    }
    
    const projects = await fs.readJSON(projectsPath);
    res.json(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

app.get('/api/projects/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const projectsPath = path.join(__dirname, '../src/data/projects.json');
    
    if (!await fs.pathExists(projectsPath)) {
      return res.status(404).json({ error: 'Projects data not found' });
    }
    
    const projects = await fs.readJSON(projectsPath);
    const project = projects.find(p => p.slug === slug);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error loading project:', error);
    res.status(500).json({ error: 'Failed to load project' });
  }
});

app.get('/api/projects/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const projectsPath = path.join(__dirname, '../src/data/projects.json');
    
    if (!await fs.pathExists(projectsPath)) {
      return res.status(404).json({ error: 'Projects data not found' });
    }
    
    const projects = await fs.readJSON(projectsPath);
    const filteredProjects = projects.filter(p => p.category === category);
    
    res.json(filteredProjects);
  } catch (error) {
    console.error('Error loading projects by category:', error);
    res.status(500).json({ error: 'Failed to load projects' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
});