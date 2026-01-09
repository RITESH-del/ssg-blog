const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const matter = require('gray-matter');
const MarkdownIt = require('markdown-it');
const config = require('./config');

// Initialize Markdown with config settings
const md = new MarkdownIt({
  html: config.markdown.html,
  linkify: config.markdown.linkify,
  typographer: config.markdown.typographer,
  breaks: config.markdown.breaks,
});

// Configuration from config.js
const CONTENT_DIR = path.join(__dirname, config.paths.content);
const TEMPLATES_DIR = path.join(__dirname, config.paths.templates);
const BUILD_DIR = path.join(__dirname, config.paths.build);
const PUBLIC_DIR = path.join(__dirname, config.paths.public);

// Helper function to ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Read all blog posts
function getPosts() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.warn('⚠️  Content directory not found:', CONTENT_DIR);
    return [];
  }
  
  const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
  
  const posts = files.map(file => {
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data, content: markdown } = matter(content);
    
    return {
      slug: file.replace('.md', ''),
      title: data.title,
      date: data.date,
      description: data.description || '',
      author: data.author || config.blog.defaultAuthor,
      tags: data.tags || [],
      content: md.render(markdown),
      rawContent: markdown
    };
  });
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate individual post pages
function generatePostPages(posts) {
  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'post.ejs'), 'utf-8');
  
  posts.forEach(post => {
    const html = ejs.render(template, { post, posts, config });
    const postDir = path.join(BUILD_DIR, 'posts', post.slug);
    ensureDir(postDir);
    fs.writeFileSync(path.join(postDir, 'index.html'), html);
    if (config.build.verbose) {
      console.log(`✓ Generated: posts/${post.slug}/index.html`);
    }
  });
}

// Generate homepage
function generateHomePage(posts) {
  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'index.ejs'), 'utf-8');
  const html = ejs.render(template, { posts, config });
  fs.writeFileSync(path.join(BUILD_DIR, 'index.html'), html);
  if (config.build.verbose) {
    console.log('✓ Generated: index.html');
  }
}

// Generate about page
function generateAboutPage(posts) {
  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'about.ejs'), 'utf-8');
  const html = ejs.render(template, { posts, config });
  const aboutDir = path.join(BUILD_DIR, 'about');
  ensureDir(aboutDir);
  fs.writeFileSync(path.join(aboutDir, 'index.html'), html);
  if (config.build.verbose) {
    console.log('✓ Generated: about/index.html');
  }
}

// Copy static assets
function copyAssets() {
  // Copy CSS
  const cssDir = path.join(BUILD_DIR, 'styles');
  ensureDir(cssDir);
  
  const srcStylesDir = path.join(__dirname, config.paths.styles);
  if (fs.existsSync(srcStylesDir)) {
    const cssFiles = fs.readdirSync(srcStylesDir);
    cssFiles.forEach(file => {
      fs.copyFileSync(
        path.join(srcStylesDir, file),
        path.join(cssDir, file)
      );
    });
    if (config.build.verbose) {
      console.log('✓ Copied CSS files');
    }
  }
  
  // Copy JS
  const jsDir = path.join(BUILD_DIR, 'scripts');
  ensureDir(jsDir);
  
  const srcScriptsDir = path.join(__dirname, config.paths.scripts);
  if (fs.existsSync(srcScriptsDir)) {
    const jsFiles = fs.readdirSync(srcScriptsDir);
    jsFiles.forEach(file => {
      fs.copyFileSync(
        path.join(srcScriptsDir, file),
        path.join(jsDir, file)
      );
    });
    if (config.build.verbose) {
      console.log('✓ Copied JS files');
    }
  }
  
  // Copy public assets if they exist
  if (fs.existsSync(PUBLIC_DIR)) {
    const publicFiles = fs.readdirSync(PUBLIC_DIR);
    publicFiles.forEach(file => {
      const srcPath = path.join(PUBLIC_DIR, file);
      const destPath = path.join(BUILD_DIR, file);
      
      if (fs.statSync(srcPath).isDirectory()) {
        ensureDir(destPath);
        fs.cpSync(srcPath, destPath, { recursive: true });
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
    if (config.build.verbose) {
      console.log('✓ Copied public assets');
    }
  }
}

// Clean build directory
function cleanBuild() {
  if (config.build.cleanBuild && fs.existsSync(BUILD_DIR)) {
    fs.rmSync(BUILD_DIR, { recursive: true });
  }
  ensureDir(BUILD_DIR);
  if (config.build.verbose) {
    console.log('✓ Cleaned build directory');
  }
}

// Main build function
function build() {
  console.log('🚀 Starting build...\n');
  console.log(`📝 Site: ${config.site.title}`);
  console.log(`🌐 URL: ${config.site.url}\n`);
  
  cleanBuild();
  const posts = getPosts();
  
  console.log(`Found ${posts.length} posts\n`);
  
  generateHomePage(posts);
  generatePostPages(posts);
  generateAboutPage(posts);
  copyAssets();
  
  console.log('\n✨ Build complete! Files are in the /build directory');
  console.log(`📦 Ready to deploy to ${config.site.url}`);
}

// Run build
build();