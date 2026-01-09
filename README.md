# Blog SSG - Static Site Generator

A custom Static Site Generator for blogs built with Node.js, Express, and EJS templates.

## Features

- 📝 Write posts in Markdown with front matter
- 🎨 Beautiful, responsive design
- ⚡ Fast static site generation
- 🔍 SEO-friendly HTML structure
- 🎯 Tag support for posts
- 📱 Mobile-responsive
- 🚀 Easy deployment

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express** - Development server
- **EJS** - Templating engine
- **Markdown-it** - Markdown parsing
- **Gray-matter** - Front matter parsing
- **HTML/CSS/JavaScript** - Frontend

## Project Structure

```
blog-ssg/
├── content/
│   └── posts/           # Markdown blog posts
├── src/
│   ├── templates/       # EJS templates
│   ├── styles/          # CSS files
│   └── scripts/         # JavaScript files
├── public/              # Static assets (images, fonts, etc.)
├── build/               # Generated static site
├── generate.js          # SSG build script
├── server.js            # Development server
└── package.json
```

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

1. Build the site:
```bash
npm run build
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:3000`

Or run both commands at once:
```bash
npm start
```

## Creating Blog Posts

1. Create a new `.md` file in `content/posts/`
2. Add front matter at the top:

```markdown
---
title: "Your Post Title"
date: "2025-01-09"
description: "A brief description of your post"
author: "Your Name"
tags: ["tag1", "tag2"]
---

# Your Post Title

Your content here...
```

3. Run `npm run build` to generate the static site
4. The post will be available at `/posts/your-filename/`

## Customization

### Styling

Edit `src/styles/main.css` to customize the look and feel. CSS variables are defined at the top for easy theming:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    /* ... more variables */
}
```

### Templates

- `src/templates/index.ejs` - Homepage
- `src/templates/post.ejs` - Individual blog post
- `src/templates/about.ejs` - About page

### Adding New Pages

1. Create a new EJS template in `src/templates/`
2. Add a generation function in `generate.js`
3. Call the function in the `build()` function

## Deployment

The `build/` directory contains your complete static site. Deploy it to any static hosting service:

### Netlify
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Vercel
```bash
vercel --prod
```

### GitHub Pages
1. Build your site: `npm run build`
2. Push the `build/` directory to a `gh-pages` branch

### Traditional Hosting
Upload the contents of the `build/` directory to your web server.

## Features in Detail

### Markdown Support
Write your posts in Markdown with support for:
- Headers
- Lists
- Code blocks with syntax highlighting
- Blockquotes
- Links and images
- And more!

### Front Matter
Each post supports the following front matter fields:
- `title` (required) - Post title
- `date` (required) - Publication date
- `description` - Meta description
- `author` - Post author
- `tags` - Array of tags

### Automatic Features
- Reading time estimation
- Related posts
- Responsive images
- Code block copy buttons
- Smooth scrolling
- SEO meta tags

## Development Tips

1. **Hot Reload**: Use `nodemon` for auto-restart:
   ```bash
   npm install -g nodemon
   nodemon generate.js
   ```

2. **Watch Mode**: Create a watch script to rebuild on changes:
   ```bash
   npm install --save-dev chokidar-cli
   ```

3. **Image Optimization**: Add images to `public/images/` and reference them in posts

## License

MIT License - feel free to use this for your own projects!

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Support

If you have questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Node.js and EJS
