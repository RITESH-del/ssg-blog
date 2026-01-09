# Configuration Guide

The `config.js` file is the central configuration file for your blog. It controls everything from site metadata to feature flags, making it easy to customize your blog without touching the code.

## Table of Contents

- [Configuration Guide](#configuration-guide)
  - [Table of Contents](#table-of-contents)
  - [Site Metadata](#site-metadata)
  - [Social Media](#social-media)
  - [Blog Settings](#blog-settings)
  - [Navigation](#navigation)
  - [Directory Paths](#directory-paths)
  - [Build Settings](#build-settings)
  - [SEO Settings](#seo-settings)
  - [Feature Flags](#feature-flags)
  - [Analytics](#analytics)
  - [Comments](#comments)
  - [RSS Feed](#rss-feed)
  - [Theme](#theme)
  - [Markdown](#markdown)
  - [Development Server](#development-server)
  - [Quick Configuration Examples](#quick-configuration-examples)
    - [Personal Blog](#personal-blog)
    - [Tech Company Blog](#tech-company-blog)
    - [Minimalist Blog](#minimalist-blog)
  - [Environment-Specific Config](#environment-specific-config)
  - [Validation](#validation)
  - [Need Help?](#need-help)

---

## Site Metadata

Controls your site's basic information and meta tags.

```javascript
site: {
  title: 'My Blog',                    // Site name (appears in header, title tags)
  description: '...',                   // Site description (meta tags)
  author: 'Your Name',                  // Default author name
  email: 'your.email@example.com',      // Contact email
  url: 'https://yourblog.com',          // Production URL (no trailing slash)
  lang: 'en',                           // Language code
  favicon: '/favicon.ico',              // Favicon path
}
```

**Usage:**
- `title`: Appears in browser tab, header, and SEO tags
- `description`: Used in meta descriptions and homepage
- `url`: Required for proper SEO and RSS feed generation
- `lang`: Sets the HTML lang attribute

---

## Social Media

Add your social media profile links to appear in the footer.

```javascript
social: {
  twitter: 'https://twitter.com/yourusername',
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  facebook: '',     // Leave empty to hide
  instagram: '',    // Leave empty to hide
}
```

**Tips:**
- Leave a field empty (`''`) to hide that social link
- Links appear in the footer automatically
- Add new social platforms by editing the templates

---

## Blog Settings

Control how blog posts are displayed and formatted.

```javascript
blog: {
  postsPerPage: 10,           // Number of posts on homepage
  excerptLength: 150,          // Characters for excerpts
  dateFormat: 'long',          // 'short', 'long', or 'numeric'
  showReadingTime: true,       // Show estimated reading time
  showAuthor: true,            // Display author names
  showTags: true,              // Display post tags
  defaultAuthor: 'Anonymous',  // Fallback if no author specified
}
```

**Date Format Options:**
- `'long'`: January 9, 2025
- `'short'`: Jan 9, 2025
- `'numeric'`: 01/09/2025

---

## Navigation

Define your site's navigation menu.

```javascript
navigation: [
  { name: 'Home', path: '/', active: true },
  { name: 'About', path: '/about/', active: true },
  { name: 'Contact', path: '/contact/', active: false },
]
```

**Properties:**
- `name`: Link text
- `path`: URL path (include trailing slash for directories)
- `active`: Set to `false` to hide from menu

**Adding New Pages:**
1. Add navigation item
2. Create template in `src/templates/`
3. Add generation function in `generate.js`

---

## Directory Paths

Customize where the SSG looks for files and outputs build.

```javascript
paths: {
  content: './content/posts',   // Markdown blog posts
  templates: './src/templates', // EJS templates
  styles: './src/styles',       // CSS files
  scripts: './src/scripts',     // JavaScript files
  public: './public',           // Static assets
  build: './build',             // Build output directory
}
```

**Note:** Changing these paths requires updating your project structure to match.

---

## Build Settings

Control the build process behavior.

```javascript
build: {
  cleanBuild: true,        // Clean build directory before building
  verbose: true,           // Show detailed build logs
  generateSitemap: true,   // Generate sitemap.xml (future feature)
  generateRSS: true,       // Generate RSS feed (future feature)
}
```

**Tips:**
- Set `verbose: false` for cleaner build output
- `cleanBuild: false` preserves manually added files in build/

---

## SEO Settings

Optimize your site for search engines and social sharing.

```javascript
seo: {
  ogImage: '/images/og-image.jpg',     // Default Open Graph image
  twitterCard: 'summary_large_image',  // Twitter card type
  keywords: ['blog', 'tech', 'coding'], // Default keywords
}
```

**Open Graph Image:**
- Recommended size: 1200x630px
- Place in `public/images/`
- Used when sharing on social media

**Twitter Card Types:**
- `summary`: Small square image
- `summary_large_image`: Large rectangular image

---

## Feature Flags

Enable or disable features easily.

```javascript
features: {
  comments: false,      // Enable comments system
  analytics: false,     // Enable analytics tracking
  search: false,        // Enable client-side search (future)
  darkMode: false,      // Enable dark mode toggle (future)
  relatedPosts: true,   // Show related posts section
}
```

**Current Status:**
- ✅ `relatedPosts`: Fully implemented
- 🚧 `comments`, `analytics`: Requires additional setup
- 📅 `search`, `darkMode`: Planned features

---

## Analytics

Configure analytics tracking (requires `features.analytics: true`).

```javascript
analytics: {
  googleAnalytics: 'G-XXXXXXXXXX',  // GA4 tracking ID
  plausible: 'yourdomain.com',      // Plausible domain
}
```

**Setup:**
1. Set `features.analytics: true`
2. Add your tracking ID
3. Update templates to include tracking scripts

---

## Comments

Configure comment system (requires `features.comments: true`).

```javascript
comments: {
  provider: 'disqus',              // 'disqus', 'utterances', 'giscus'
  disqusShortname: 'yourblog',     // For Disqus
  utterancesRepo: 'user/repo',     // For Utterances
  giscusRepo: 'user/repo',         // For Giscus
  giscusRepoId: '',
  giscusCategory: '',
  giscusCategoryId: '',
}
```

**Providers:**
- **Disqus**: Popular, feature-rich, free tier available
- **Utterances**: GitHub issues-based, completely free
- **Giscus**: GitHub discussions-based, completely free

---

## RSS Feed

Configure RSS feed generation (planned feature).

```javascript
rss: {
  title: 'My Blog RSS Feed',
  description: 'Latest posts from My Blog',
  feedPath: '/feed.xml',
  itemCount: 20,          // Number of posts in feed
}
```

---

## Theme

Customize colors and fonts.

```javascript
theme: {
  primaryColor: '#2563eb',     // Main brand color
  secondaryColor: '#1e40af',   // Secondary accent
  accentColor: '#f59e0b',      // Highlight color
  fontFamily: 'system-ui, sans-serif',
  codeFont: '"Courier New", monospace',
}
```

**Applying Theme:**
Theme values are available in templates via `config.theme`.
You can update CSS variables in `main.css` or use theme values directly in templates.

---

## Markdown

Configure Markdown parsing behavior.

```javascript
markdown: {
  html: true,         // Allow HTML in markdown files
  linkify: true,      // Auto-convert URLs to links
  typographer: true,  // Smart quotes and typography
  breaks: false,      // Convert \n to <br>
  highlight: null,    // Custom syntax highlighting function
}
```

**Options Explained:**
- `html: true`: Allows `<div>`, `<span>`, etc. in markdown
- `linkify: true`: Turns `http://example.com` into clickable links
- `typographer: true`: Converts `"quotes"` to "smart quotes"
- `breaks: false`: Requires two spaces or blank line for line breaks

---

## Development Server

Configure the Express development server.

```javascript
dev: {
  port: 3000,          // Server port
  host: 'localhost',   // Server host
  openBrowser: false,  // Auto-open browser on start (future)
}
```

**Usage:**
```bash
npm run dev
# Server runs at http://localhost:3000
```

---

## Quick Configuration Examples

### Personal Blog
```javascript
site: {
  title: 'John Doe Blog',
  author: 'John Doe',
  description: 'Thoughts on web development and design',
}
blog: {
  showAuthor: false,  // Only one author
  showReadingTime: true,
}
```

### Tech Company Blog
```javascript
site: {
  title: 'TechCorp Engineering Blog',
  author: 'TechCorp Team',
}
blog: {
  showAuthor: true,   // Multiple authors
  postsPerPage: 5,
}
features: {
  analytics: true,
}
```

### Minimalist Blog
```javascript
blog: {
  showTags: false,
  showReadingTime: false,
}
features: {
  relatedPosts: false,
  comments: false,
}
```

---

## Environment-Specific Config

For different environments (development, production), you can use environment variables:

```javascript
// config.js
module.exports = {
  site: {
    url: process.env.NODE_ENV === 'production' 
      ? 'https://yourblog.com' 
      : 'http://localhost:3000',
  },
  // ... rest of config
};
```

Then set environment:
```bash
# Development
npm run dev

# Production build
NODE_ENV=production npm run build
```

---

## Validation

The config file does not validate settings automatically. Make sure to:

- ✅ Use valid URLs (with `https://`)
- ✅ Use correct date format options
- ✅ Keep paths relative (starting with `./`)
- ✅ Leave strings empty (`''`) not undefined
- ✅ Test after making changes

---

## Need Help?

- Check example configurations above
- Refer to specific sections in this guide
- See `README.md` for general usage
- Open an issue if something doesn't work

---

**Pro Tip:** After changing config, always rebuild:
```bash
npm run build
```