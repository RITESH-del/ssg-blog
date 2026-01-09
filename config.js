// Blog Configuration File
// Customize your blog settings here

module.exports = {
  // Site Metadata
  site: {
    title: 'My Blog',
    description: 'A modern blog built with Node.js SSG',
    author: 'Your Name',
    email: 'your.email@example.com',
    url: 'https://yourblog.com', // Your production URL (no trailing slash)
    lang: 'en',
    favicon: '/favicon.ico',
  },

  // Social Media Links
  social: {
    twitter: 'https://twitter.com/yourusername',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    facebook: '', // Leave empty to hide
    instagram: '', // Leave empty to hide
  },

  // Blog Settings
  blog: {
    postsPerPage: 10, // Number of posts on homepage
    excerptLength: 150, // Characters for post excerpts
    dateFormat: 'long', // 'short', 'long', or 'numeric'
    showReadingTime: true,
    showAuthor: true,
    showTags: true,
    defaultAuthor: 'Anonymous', // Fallback if author not specified
  },

  // Navigation Menu
  navigation: [
    { name: 'Home', path: '/', active: true },
    { name: 'About', path: '/about/', active: true },
    // Add more menu items here:
    // { name: 'Contact', path: '/contact/', active: true },
    // { name: 'Projects', path: '/projects/', active: true },
  ],

  // Directory Paths
  paths: {
    content: './content/posts',
    templates: './src/templates',
    styles: './src/styles',
    scripts: './src/scripts',
    public: './public',
    build: './build',
  },

  // Build Settings
  build: {
    cleanBuild: true, // Clean build directory before building
    verbose: true, // Show detailed build logs
    generateSitemap: true, // Generate sitemap.xml
    generateRSS: true, // Generate RSS feed
  },

  // SEO Settings
  seo: {
    ogImage: '/images/og-image.jpg', // Open Graph default image
    twitterCard: 'summary_large_image',
    keywords: ['blog', 'web development', 'technology'], // Default keywords
  },

  // Feature Flags
  features: {
    comments: false, // Enable comments (requires integration)
    analytics: false, // Enable analytics (requires setup)
    search: false, // Enable client-side search
    darkMode: false, // Enable dark mode toggle
    relatedPosts: true, // Show related posts
  },

  // Analytics (if enabled)
  analytics: {
    googleAnalytics: '', // GA tracking ID: 'G-XXXXXXXXXX'
    plausible: '', // Plausible domain
  },

  // Comments (if enabled)
  comments: {
    provider: 'disqus', // 'disqus', 'utterances', 'giscus'
    disqusShortname: '',
    utterancesRepo: '', // 'username/repo'
    giscusRepo: '', // 'username/repo'
    giscusRepoId: '',
    giscusCategory: '',
    giscusCategoryId: '',
  },

  // RSS Feed Settings
  rss: {
    title: 'My Blog RSS Feed',
    description: 'Latest posts from My Blog',
    feedPath: '/feed.xml',
    itemCount: 20, // Number of items in feed
  },

  // Theme Customization
  theme: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    accentColor: '#f59e0b',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    codeFont: '"Courier New", monospace',
  },

  // Custom Pages
  customPages: [
    // Add custom pages to generate
    // { template: 'contact.ejs', output: 'contact', data: {} },
    // { template: 'projects.ejs', output: 'projects', data: {} },
  ],

  // Markdown Settings
  markdown: {
    html: true, // Allow HTML in markdown
    linkify: true, // Auto-convert URLs to links
    typographer: true, // Enable smart quotes and other typographic replacements
    breaks: false, // Convert \n to <br>
    highlight: null, // Custom syntax highlighting function (optional)
  },

  // Development Server
  dev: {
    port: 3000,
    host: 'localhost',
    openBrowser: false, // Auto-open browser on server start
  },
};