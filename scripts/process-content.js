const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const sharp = require('sharp');

class ContentProcessor {
  constructor() {
    this.sourceDir = path.join(__dirname, '../../Talaat Studio_Website/CONTENT');
    this.outputDir = path.join(__dirname, '../frontend/public/projects');
    this.dataDir = path.join(__dirname, '../frontend/src/data');
    this.projects = [];
  }

  async processContent() {
    console.log('🏗️  Processing TALAAT STUDIO content...');
    
    // Ensure output directories exist
    await fs.ensureDir(this.outputDir);
    await fs.ensureDir(this.dataDir);
    
    // Process residential projects
    await this.processResidentialProjects();
    
    // Process unbuilt projects
    await this.processUnbuiltProjects();
    
    // Generate projects data file
    await this.generateProjectsData();
    
    console.log(`✅ Processed ${this.projects.length} projects successfully`);
  }

  async processResidentialProjects() {
    const residentialDir = path.join(this.sourceDir, '3_RESIDENTIAL');
    
    if (!await fs.pathExists(residentialDir)) {
      console.log('⚠️  Residential directory not found');
      return;
    }

    const projectDirs = await fs.readdir(residentialDir);
    
    for (const projectDir of projectDirs) {
      const projectPath = path.join(residentialDir, projectDir);
      const stats = await fs.stat(projectPath);
      
      if (stats.isDirectory()) {
        await this.processProject(projectPath, 'residential');
      }
    }
  }

  async processUnbuiltProjects() {
    const unbuiltDir = path.join(this.sourceDir, '6_UNBUILT (ARCHIVE)');
    
    if (!await fs.pathExists(unbuiltDir)) {
      console.log('⚠️  Unbuilt directory not found');
      return;
    }

    const projectDirs = await fs.readdir(unbuiltDir);
    
    for (const projectDir of projectDirs) {
      const projectPath = path.join(unbuiltDir, projectDir);
      const stats = await fs.stat(projectPath);
      
      if (stats.isDirectory()) {
        await this.processProject(projectPath, 'unbuilt');
      }
    }
  }

  async processProject(projectPath, category) {
    const projectName = path.basename(projectPath);
    const slug = this.generateSlug(projectName);
    
    console.log(`📁 Processing: ${projectName}`);
    
    // Create project output directory
    const projectOutputDir = path.join(this.outputDir, slug);
    await fs.ensureDir(projectOutputDir);
    
    // Look for markdown file
    const mdFile = await this.findMarkdownFile(projectPath);
    let frontMatter = {};
    
    if (mdFile) {
      const mdContent = await fs.readFile(mdFile, 'utf8');
      const parsed = matter(mdContent);
      frontMatter = parsed.data;
    }
    
    // Process images
    const images = await this.processProjectImages(projectPath, projectOutputDir);
    
    // Create project data
    const project = {
      id: slug,
      title: frontMatter.title || this.formatProjectName(projectName),
      description: frontMatter.description || '',
      category: category,
      year: frontMatter.year || new Date().getFullYear(),
      location: frontMatter.location || '',
      images: images,
      thumbnail: images[0] || null,
      slug: slug
    };
    
    this.projects.push(project);
  }

  async processProjectImages(projectPath, outputDir) {
    const images = [];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.tif'];
    
    try {
      const files = await fs.readdir(projectPath);
      
      for (const file of files) {
        const filePath = path.join(projectPath, file);
        const stats = await fs.stat(filePath);
        
        if (stats.isFile() && imageExtensions.includes(path.extname(file).toLowerCase())) {
          // Skip archive directories
          if (file.toLowerCase().includes('archive')) continue;
          
          const outputFileName = this.sanitizeFileName(file);
          const outputPath = path.join(outputDir, outputFileName);
          
          try {
            // Process and optimize image
            await sharp(filePath)
              .jpeg({ quality: 85, progressive: true })
              .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
              .toFile(outputPath);
            
            // Generate thumbnail
            const thumbnailPath = path.join(outputDir, `thumb_${outputFileName}`);
            await sharp(filePath)
              .jpeg({ quality: 80 })
              .resize(600, 400, { fit: 'cover' })
              .toFile(thumbnailPath);
            
            images.push({
              src: `/projects/${path.basename(outputDir)}/${outputFileName}`,
              thumbnail: `/projects/${path.basename(outputDir)}/thumb_${outputFileName}`,
              alt: `${path.basename(outputDir)} - ${path.parse(file).name}`
            });
            
          } catch (error) {
            console.log(`⚠️  Error processing image ${file}:`, error.message);
          }
        }
      }
    } catch (error) {
      console.log(`⚠️  Error reading directory ${projectPath}:`, error.message);
    }
    
    return images;
  }

  async findMarkdownFile(projectPath) {
    try {
      const files = await fs.readdir(projectPath);
      const mdFile = files.find(file => path.extname(file).toLowerCase() === '.md');
      return mdFile ? path.join(projectPath, mdFile) : null;
    } catch (error) {
      return null;
    }
  }

  generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  formatProjectName(name) {
    return name
      .split('_')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ')
      .replace(/^\d+_?\s*/, ''); // Remove leading numbers and underscores
  }

  sanitizeFileName(fileName) {
    const ext = path.extname(fileName);
    const name = path.basename(fileName, ext);
    const sanitized = name.replace(/[^a-zA-Z0-9\-_]/g, '_').replace(/_+/g, '_');
    return `${sanitized}.jpg`; // Always output as JPG
  }

  async generateProjectsData() {
    const dataFile = path.join(this.dataDir, 'projects.json');
    await fs.writeJSON(dataFile, this.projects, { spaces: 2 });
    console.log(`📝 Generated projects data: ${dataFile}`);
  }
}

// Run if called directly
if (require.main === module) {
  const processor = new ContentProcessor();
  processor.processContent().catch(console.error);
}

module.exports = ContentProcessor;