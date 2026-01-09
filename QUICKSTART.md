# Quick Start Guide - Blog SSG

## Installation & Setup

Follow these steps to get your blog up and running:

### 1. Install Dependencies

```bash
cd blog-ssg
npm install
```

This will install:
- `ejs` - Template engine
- `express` - Development server
- `markdown-it` - Markdown parser
- `gray-matter` - Front matter parser

### 2. Build Your Blog

Generate the static site:

```bash
npm run build
```

You should see output like:
```
🚀 Starting build...

Found 3 posts

✓ Generated: index.html
✓ Generated: posts/getting-started-with-ssg/index.html
✓ Generated: posts/nodejs-web-applications/index.html
✓ Generated: posts/css-grid-vs-flexbox/index.html
✓ Generated: about/index.html
✓ Copied CSS files
✓ Copied JS files

✨ Build complete! Files are in the /build directory
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser!

### 4. Or Run Both Commands

```bash
npm start
```

## Creating Your First Post

1. Create a new file in `content/posts/my-first-post.md`:

```markdown
---
title: "My First Blog Post"
date: "2025-01-09"
description: "This is my very first blog post using SSG"
author: "Your Name"
tags: ["first post", "introduction"]
---

# Welcome to My Blog!

This is the content of my first post. You can use **Markdown** formatting!

## Features I Love

- Easy to write
- Fast performance
- Clean design

```

2. Rebuild the site:
```bash
npm run build
```

3. Your new post will appear on the homepage!

## Project Structure Explained

```
blog-ssg/
│
├── content/posts/          # Your blog posts (Markdown)
│   ├── post-1.md
│   └── post-2.md
│
├── src/
│   ├── templates/          # EJS templates for pages
│   │   ├── index.ejs       # Homepage
│   │   ├── post.ejs        # Blog post page
│   │   └── about.ejs       # About page
│   │
│   ├── styles/             # CSS stylesheets
│   │   └── main.css
│   │
│   └── scripts/            # JavaScript files
│       └── main.js
│
├── public/                 # Static assets (images, etc.)
│
├── build/                  # Generated site (created after build)
│   ├── index.html
│   ├── posts/
│   ├── styles/
│   └── scripts/
│
├── generate.js             # SSG build script
├── server.js               # Development server
└── package.json            # Project configuration
```

## How It Works

### 1. Content Creation
You write posts in Markdown with YAML front matter:
- Front matter contains metadata (title, date, tags)
- Markdown content is your actual post

### 2. Static Generation
When you run `npm run build`:
- `generate.js` reads all Markdown files
- Parses front matter and converts Markdown to HTML
- Renders EJS templates with the content
- Outputs static HTML files to `build/`
- Copies CSS, JS, and assets

### 3. Development Server
`server.js` runs an Express server that serves the `build/` folder for local testing.

### 4. Production Deployment
The `build/` folder contains your complete static site. Upload it anywhere!

## Customization Tips

### Change Colors
Edit `src/styles/main.css` CSS variables:
```css
:root {
    --primary-color: #2563eb;  /* Your brand color */
    --secondary-color: #1e40af;
    /* ... */
}
```

### Modify Layout
Edit EJS templates in `src/templates/`:
- `index.ejs` - Homepage layout
- `post.ejs` - Blog post layout
- `about.ejs` - About page

### Add JavaScript Features
Edit `src/scripts/main.js` to add interactive features.

### Add Images
1. Place images in `public/images/`
2. Reference in Markdown: `![Alt text](/images/photo.jpg)`

## Deployment Options

### Option 1: Netlify (Recommended)
1. Push code to GitHub
2. Import repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `build`

### Option 2: Vercel
```bash
npm install -g vercel
vercel --prod
```

### Option 3: GitHub Pages
1. Build: `npm run build`
2. Deploy `build/` folder to `gh-pages` branch

### Option 4: Any Static Host
Upload contents of `build/` folder to:
- AWS S3
- Firebase Hosting
- Cloudflare Pages
- Any web server

## Common Tasks

### Adding a New Page
1. Create template in `src/templates/contact.ejs`
2. Add generation function in `generate.js`:
```javascript
function generateContactPage(posts) {
  const template = fs.readFileSync(path.join(TEMPLATES_DIR, 'contact.ejs'), 'utf-8');
  const html = ejs.render(template, { posts });
  const contactDir = path.join(BUILD_DIR, 'contact');
  ensureDir(contactDir);
  fs.writeFileSync(path.join(contactDir, 'index.html'), html);
  console.log('✓ Generated: contact/index.html');
}
```
3. Call it in the `build()` function
4. Add navigation link

### Changing Post URL Structure
Edit `generate.js`, line where posts are generated:
```javascript
const postDir = path.join(BUILD_DIR, 'blog', post.slug); // Now /blog/post-name/
```

### Adding Categories
1. Add `category` to front matter
2. Modify templates to display categories
3. Create category pages if desired

## Troubleshooting

**Build fails:**
- Check all Markdown files have valid front matter
- Ensure dates are in correct format: "YYYY-MM-DD"

**Styles not loading:**
- Verify CSS file exists in `src/styles/`
- Check build output for copy errors
- Clear browser cache

**Server won't start:**
- Port 3000 might be in use
- Change in `server.js`: `const PORT = 4000;`

## Next Steps

1. ✅ Customize the design in `main.css`
2. ✅ Edit the About page in `src/templates/about.ejs`
3. ✅ Create your own blog posts
4. ✅ Add your own images to `public/`
5. ✅ Deploy to your favorite hosting platform

Happy blogging! 🚀
