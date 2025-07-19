const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const sharp = require('sharp');

class ContentProcessor {
  constructor(options = {}) {
    this.sourceDir = path.join(__dirname, '../src/data/projects');
    this.outputDir = path.join(__dirname, '../public/projects');
    this.dataDir = path.join(__dirname, '../src/data');
    this.projects = [];
    this.forceReprocess = options.force || false;
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
    const residentialDir = path.join(this.sourceDir, 'residential');
    
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
    const unbuiltDir = path.join(this.sourceDir, 'unbuilt');
    
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
    
    // Process images with progress tracking
    const startTime = Date.now();
    const images = await this.processProjectImages(projectPath, projectOutputDir);
    const processingTime = Date.now() - startTime;
    
    // Skip projects with no images
    if (images.length === 0) {
      console.log(`⚠️  Skipping ${projectName} - no images found`);
      return;
    }
    
    console.log(`✅ Processed ${projectName} (${images.length} images) in ${(processingTime/1000).toFixed(1)}s`);
    
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
          // Skip archive directories and thumbnail files
          if (file.toLowerCase().includes('archive') || file.toLowerCase().startsWith('thumb_')) continue;
          
          const baseName = this.sanitizeFileName(file, false);
          const baseOutputPath = path.join(outputDir, baseName);
          
          // Check if all optimized versions already exist and are newer than source
          const jpegPath = `${baseOutputPath}.jpg`;
          const webpPath = `${baseOutputPath}.webp`;
          const avifPath = `${baseOutputPath}.avif`;
          const thumbJpegPath = path.join(outputDir, `thumb_${baseName}.jpg`);
          const thumbWebpPath = path.join(outputDir, `thumb_${baseName}.webp`);
          const thumbAvifPath = path.join(outputDir, `thumb_${baseName}.avif`);
          
          const sourceTime = stats.mtime;
          const shouldSkip = !this.forceReprocess && await this.shouldSkipImageProcessing(
            [jpegPath, webpPath, avifPath, thumbJpegPath, thumbWebpPath, thumbAvifPath],
            sourceTime
          );
          
          if (shouldSkip) {
            console.log(`⚡ Skipping ${file} - optimized versions already exist`);
            
            // Still add to images array for data generation
            images.push({
              src: {
                avif: `/projects/${path.basename(outputDir)}/${baseName}.avif`,
                webp: `/projects/${path.basename(outputDir)}/${baseName}.webp`,
                jpeg: `/projects/${path.basename(outputDir)}/${baseName}.jpg`
              },
              thumbnail: {
                avif: `/projects/${path.basename(outputDir)}/thumb_${baseName}.avif`,
                webp: `/projects/${path.basename(outputDir)}/thumb_${baseName}.webp`,
                jpeg: `/projects/${path.basename(outputDir)}/thumb_${baseName}.jpg`
              },
              alt: `${path.basename(outputDir)} - ${path.parse(file).name}`,
              width: 1920,
              height: 1080
            });
            continue;
          }
          
          console.log(`🖼️  Processing ${file}...`);
          
          try {
            const sharpInstance = sharp(filePath)
              .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true });
            
            // Generate JPEG (fallback)
            await sharpInstance
              .clone()
              .jpeg({ quality: 85, progressive: true })
              .toFile(jpegPath);
            
            // Generate WebP
            await sharpInstance
              .clone()
              .webp({ quality: 80, effort: 6 })
              .toFile(webpPath);
            
            // Generate AVIF
            const avifPath = `${baseOutputPath}.avif`;
            await sharpInstance
              .clone()
              .avif({ quality: 75, effort: 6 })
              .toFile(avifPath);
            
            // Generate thumbnails in multiple formats
            const thumbSharpInstance = sharp(filePath)
              .resize(600, 400, { fit: 'cover' });
            
            const thumbJpegPath = path.join(outputDir, `thumb_${baseName}.jpg`);
            await thumbSharpInstance
              .clone()
              .jpeg({ quality: 80 })
              .toFile(thumbJpegPath);
            
            const thumbWebpPath = path.join(outputDir, `thumb_${baseName}.webp`);
            await thumbSharpInstance
              .clone()
              .webp({ quality: 75, effort: 6 })
              .toFile(thumbWebpPath);
            
            const thumbAvifPath = path.join(outputDir, `thumb_${baseName}.avif`);
            await thumbSharpInstance
              .clone()
              .avif({ quality: 70, effort: 6 })
              .toFile(thumbAvifPath);
            
            images.push({
              src: {
                avif: `/projects/${path.basename(outputDir)}/${baseName}.avif`,
                webp: `/projects/${path.basename(outputDir)}/${baseName}.webp`,
                jpeg: `/projects/${path.basename(outputDir)}/${baseName}.jpg`
              },
              thumbnail: {
                avif: `/projects/${path.basename(outputDir)}/thumb_${baseName}.avif`,
                webp: `/projects/${path.basename(outputDir)}/thumb_${baseName}.webp`,
                jpeg: `/projects/${path.basename(outputDir)}/thumb_${baseName}.jpg`
              },
              alt: `${path.basename(outputDir)} - ${path.parse(file).name}`,
              width: 1920,
              height: 1080
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

  async shouldSkipImageProcessing(outputPaths, sourceTime) {
    try {
      // Check if all output files exist and are newer than source
      for (const outputPath of outputPaths) {
        if (!await fs.pathExists(outputPath)) {
          return false; // File doesn't exist, need to process
        }
        
        const outputStats = await fs.stat(outputPath);
        if (outputStats.mtime <= sourceTime) {
          return false; // Output is older than source, need to reprocess
        }
      }
      
      return true; // All files exist and are newer than source
    } catch (error) {
      return false; // On any error, reprocess to be safe
    }
  }

  formatProjectName(name) {
    return name
      .replace(/^\d+[_-]?/, '') // Remove leading numbers with optional separator
      .replace(/[_-]/g, ' ') // Replace underscores and hyphens with spaces
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove all special characters except letters, numbers, and spaces
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .split(' ')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(' ')
      .trim();
  }

  sanitizeFileName(fileName, includeExtension = true) {
    const ext = path.extname(fileName);
    const name = path.basename(fileName, ext);
    const sanitized = name.replace(/[^aA-zZ0-9\-_]/g, '_').replace(/_+/g, '_');
    return includeExtension ? `${sanitized}.jpg` : sanitized;
  }

  async generateProjectsData() {
    const dataFile = path.join(this.dataDir, 'projects.json');
    await fs.writeJSON(dataFile, this.projects, { spaces: 2 });
    console.log(`📝 Generated projects data: ${dataFile}`);
  }
}

// Run if called directly
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    force: args.includes('--force') || args.includes('-f')
  };
  
  if (options.force) {
    console.log('🔄 Force reprocessing enabled - will regenerate all images');
  } else {
    console.log('⚡ Smart caching enabled - will skip existing optimized images');
    console.log('💡 Use --force flag to regenerate all images');
  }
  
  const processor = new ContentProcessor(options);
  processor.processContent().catch(console.error);
}

module.exports = ContentProcessor;