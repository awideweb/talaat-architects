#!/usr/bin/env node

const ContentProcessor = require('./process-content');

async function buildContent() {
  console.log('🏗️  Building content for TALAAT STUDIO...');
  
  try {
    const processor = new ContentProcessor();
    await processor.processContent();
    console.log('✅ Content build completed successfully!');
  } catch (error) {
    console.error('❌ Content build failed:', error);
    process.exit(1);
  }
}

buildContent();