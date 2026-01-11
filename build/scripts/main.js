// Main JavaScript file for the blog

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to current navigation item
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-links a');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath.startsWith('/posts/') && link.getAttribute('href') === '/')) {
        link.classList.add('active');
    }
});

// Add reading time estimation to posts
function estimateReadingTime() {
    const postContent = document.querySelector('.post-content');
    if (!postContent) return;

    const text = postContent.textContent || postContent.innerText;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

    const postMeta = document.querySelector('.post-meta');
    if (postMeta && readingTime > 0) {
        const readingTimeElement = document.createElement('span');
        readingTimeElement.innerHTML = `<span class="separator">•</span><span>${readingTime} min read</span>`;
        postMeta.appendChild(readingTimeElement);
    }
}

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    estimateReadingTime();
    
    // Add fade-in animation to post cards
    const postCards = document.querySelectorAll('.post-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    postCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Add copy button to code blocks
document.addEventListener('DOMContentLoaded', () => {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((block) => {
        const pre = block.parentElement;
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            padding: 0.25rem 0.75rem;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
        `;
        
        pre.style.position = 'relative';
        
        button.addEventListener('click', async () => {
            const code = block.textContent;
            await navigator.clipboard.writeText(code);
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });
        
        pre.appendChild(button);
    });
});

console.log('🚀 Blog loaded successfully!');