/**
 * Cortivus Shared Components
 * Handles the injection of Header and Footer across all pages to reduce code duplication.
 */

const CortivusComponents = {
    // Configuration for navigation links
    navLinks: [
        { text: 'Home', href: '/index.html' },
        {
            text: 'Portfolio',
            href: '/portfolio/',
            dropdown: [
                { text: 'All', href: '/portfolio/' },
                { text: 'Lead with Precision', href: '/education/' },
                { text: 'Project Writer', href: '/portfolio/execution/' },
                { text: 'Curriculum Utility', href: '/portfolio/curriculum/' },
                { text: 'Journey2Health', href: '/portfolio/journey2health/' },
                { text: 'Sermon Generator', href: '/portfolio/sermon-generator/' },
                { text: 'MakeItADouble', href: '/portfolio/#makeitadouble' }
            ]
        },
        { text: 'Education', href: '/education/' },
        { text: 'Company', href: '/company/team.html' },
        { text: 'Contact', href: '/index.html#contact' }
    ],

    /**
     * Renders the Header into the target element
     * @param {string} targetId - ID of the element to replace with the header
     */
    renderHeader: function (targetId) {
        const headerHTML = `
        <header>
            <div class="container">
                <div class="header-content">
                    <div class="logo">
                        <a href="/index.html" style="text-decoration: none; display: flex; align-items: center; color: white;">
                            <img src="/images/logo.png" alt="Cortivus Logo">
                            <h1>Cortivus</h1>
                        </a>
                    </div>
                    <button class="mobile-nav-toggle" aria-label="Toggle navigation menu">
                        <i class="fas fa-bars"></i>
                    </button>
                    <nav>
                        <ul>
                            ${this.generateNavItems()}
                        </ul>
                    </nav>
                </div>
            </div>
        </header>`;

        const target = document.getElementById(targetId);
        if (target) {
            target.outerHTML = headerHTML;
            // Mobile nav listeners handled by main.js
        }
    },

    /**
     * Renders the Footer into the target element
     * @param {string} targetId - ID of the element to replace with the footer
     */
    renderFooter: function (targetId) {
        const footerHTML = `
        <footer>
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <div class="footer-logo">
                            <img src="/images/logo.png" alt="Cortivus Logo">
                            <h3>Cortivus</h3>
                        </div>
                        <p class="footer-motto">AI-powered tools that actually work—because every product starts with a real problem, not a buzzword.</p>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <nav class="footer-nav">
                            <a href="/index.html">Home</a>
                            <a href="/portfolio/">Portfolio</a>
                            <a href="/education/">Education</a>
                            <a href="/company/team.html">Company</a>
                            <a href="/index.html#contact">Contact</a>
                        </nav>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Credentials</h4>
                        <div class="footer-badges">
                            <span class="badge">NVIDIA Inception</span>
                            <span class="badge">Google Cloud Ready</span>
                            <span class="badge">Self-Funded</span>
                        </div>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Cortivus. Transforming businesses through intelligent AI solutions.</p>
                </div>
            </div>
        </footer>`;

        const target = document.getElementById(targetId);
        if (target) {
            target.outerHTML = footerHTML;
        }
    },

    /**
     * Helper to generate list items for navigation with active state highlighting
     */
    generateNavItems: function () {
        const currentPath = window.location.pathname;

        return this.navLinks.map(link => {
            // Determine active state
            let isActive = false;

            // Exact match
            if (link.href === currentPath) {
                isActive = true;
            }
            // Handle directory index matching (e.g. /portfolio/ matching /portfolio/index.html)
            else if (link.href.endsWith('/') && currentPath === link.href + 'index.html') {
                isActive = true;
            }
            // Highlight parent if child is active (specifically for Portfolio)
            else if (link.text === 'Portfolio' && currentPath.includes('/portfolio/')) {
                isActive = true;
            }
            else if (link.text === 'Education' && currentPath.includes('/education/')) {
                isActive = true;
            }

            const activeClass = isActive ? ' class="active"' : '';

            if (link.dropdown) {
                // Check if any dropdown item is active to highlight parent
                // FIX: Only highlight parent if the matching link actually belongs to this section (starts with same path prefix)
                // or if it's strictly a proper child. For Portfolio, we exclude /education/ links to avoid double highlighting.
                const isDropdownActive = link.dropdown.some(item => {
                    return item.href === currentPath && (link.text !== 'Portfolio' || item.href.startsWith('/portfolio/'));
                });
                const dropdownActiveClass = (isActive || isDropdownActive) ? ' active' : '';

                return `
                <li class="dropdown">
                    <a href="${link.href}" class="dropdown-toggle${dropdownActiveClass}">${link.text} <i class="fas fa-chevron-down"></i></a>
                    <ul class="dropdown-menu">
                        ${link.dropdown.map(item => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}
                    </ul>
                </li>`;
            }
            return `<li><a href="${link.href}"${activeClass} ${link.style ? `style="${link.style}"` : ''}>${link.text}</a></li>`;
        }).join('');
    }
};
