# Blog SSG Architecture

## System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     CONTENT CREATION                         │
│                                                              │
│  ┌──────────────┐     ┌──────────────┐    ┌──────────────┐ │
│  │  Markdown    │     │  Front       │    │   Public     │ │
│  │  Blog Posts  │────▶│  Matter      │    │   Assets     │ │
│  │  (.md files) │     │  (YAML)      │    │  (images)    │ │
│  └──────────────┘     └──────────────┘    └──────────────┘ │
│                              │                     │         │
└──────────────────────────────┼─────────────────────┼─────────┘
                               │                     │
                               ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    BUILD PROCESS                             │
│                   (generate.js)                              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 1. Read Markdown Files                                 │ │
│  │    - Scan content/posts/ directory                     │ │
│  │    - Parse each .md file                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                         ↓                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 2. Parse Front Matter                                  │ │
│  │    - Extract metadata (title, date, tags, author)      │ │
│  │    - gray-matter library                               │ │
│  └────────────────────────────────────────────────────────┘ │
│                         ↓                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 3. Convert Markdown to HTML                            │ │
│  │    - markdown-it parser                                │ │
│  │    - Generate HTML content                             │ │
│  └────────────────────────────────────────────────────────┘ │
│                         ↓                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 4. Render EJS Templates                                │ │
│  │    ├─ index.ejs    → Homepage                          │ │
│  │    ├─ post.ejs     → Individual posts                  │ │
│  │    └─ about.ejs    → About page                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                         ↓                                    │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ 5. Generate Static Files                               │ │
│  │    - Create /build directory structure                 │ │
│  │    - Write HTML files                                  │ │
│  │    - Copy CSS, JS, and assets                          │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    STATIC OUTPUT                             │
│                   (build/ directory)                         │
│                                                              │
│  build/                                                      │
│  ├── index.html              (Homepage)                      │
│  ├── about/                                                  │
│  │   └── index.html          (About page)                   │
│  ├── posts/                                                  │
│  │   ├── post-1/                                            │
│  │   │   └── index.html                                     │
│  │   └── post-2/                                            │
│  │       └── index.html                                     │
│  ├── styles/                                                 │
│  │   └── main.css                                           │
│  └── scripts/                                                │
│      └── main.js                                             │
└─────────────────────────────────────────────────────────────┘
                               │
              ┌────────────────┴────────────────┐
              ▼                                 ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│  DEVELOPMENT SERVER      │    │   PRODUCTION DEPLOY      │
│     (server.js)          │    │                          │
│                          │    │  Options:                │
│  ┌────────────────────┐  │    │  • Netlify               │
│  │  Express Server    │  │    │  • Vercel                │
│  │  Port: 3000        │  │    │  • GitHub Pages          │
│  │  Serves /build     │  │    │  • AWS S3                │
│  └────────────────────┘  │    │  • Any static host       │
│                          │    │                          │
│  http://localhost:3000   │    │  https://yourblog.com    │
└──────────────────────────┘    └──────────────────────────┘
```

## Component Details

### 1. Content Layer
- **Markdown Files**: Human-readable content format
- **Front Matter**: YAML metadata at top of each file
- **Assets**: Images, fonts, and other static files

### 2. Template Layer
- **EJS Templates**: Dynamic HTML generation
- **Layouts**: Reusable page structures
- **Components**: Navigation, footer, post cards

### 3. Build Layer
- **generate.js**: Main SSG script
- **Processing Pipeline**: 
  1. File system operations
  2. Content parsing
  3. Template rendering
  4. Static file generation

### 4. Output Layer
- **Static HTML**: Pre-rendered pages
- **Assets**: Copied CSS, JS, images
- **Clean URLs**: /posts/slug/ structure

### 5. Serving Layer
- **Development**: Express server for local testing
- **Production**: Any static file server

## Data Flow Example

```
my-post.md
    │
    ├─ Front Matter:
    │     title: "Hello World"
    │     date: "2025-01-09"
    │     tags: ["intro"]
    │
    └─ Markdown Content:
          # Hello World
          This is my post...
              │
              ▼
        [generate.js processes]
              │
              ├─ Parse with gray-matter
              ├─ Convert MD to HTML
              ├─ Inject into post.ejs
              │
              ▼
        /build/posts/my-post/index.html
              │
              ├─ Full HTML page
              ├─ SEO meta tags
              ├─ Styled content
              └─ Navigation links
```

## Technology Stack

```
┌─────────────────────────────────────┐
│          Frontend Layer             │
│  • HTML5                            │
│  • CSS3 (with variables)            │
│  • Vanilla JavaScript               │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│        Templating Layer             │
│  • EJS (Embedded JavaScript)        │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│         Build Layer                 │
│  • Node.js                          │
│  • markdown-it (MD parsing)         │
│  • gray-matter (Front matter)       │
└─────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────┐
│         Server Layer                │
│  • Express.js (Development)         │
│  • Static file serving              │
└─────────────────────────────────────┘
```

## Key Benefits

✅ **Performance**: Pre-built HTML = instant page loads
✅ **Security**: No database = minimal attack surface  
✅ **Scalability**: Static files = easy CDN distribution
✅ **SEO**: Perfect HTML structure = great search rankings
✅ **Cost**: Host anywhere for free or cheap
✅ **Simplicity**: No backend complexity to maintain
