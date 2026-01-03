/**
 * Cortivus Shared Components
 * Handles the injection of Header and Footer across all pages to reduce code duplication.
 */

const CortivusComponents = {
    // Configuration for navigation links
    navLinks: [
        { text: 'Home', href: '/index.html' },
        {
            text: 'Platform',
            href: '/index.html#platform',
            dropdown: [
                { text: 'Platform Overview', href: '/index.html#platform' },
                { text: 'Career Profile', href: '/platform/career-profile/' },
                { text: 'The Tutor', href: '/platform/tutor/' },
                { text: 'The Job AId', href: '/platform/job-aid/' },
                { text: 'The Mentor', href: '/platform/mentor/' }
            ]
        },
        { text: 'About', href: '/company/team.html' },
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
                        <p class="footer-motto">You built your expertise over decades. Now build the career it deserves.</p>
                    </div>
                    
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <nav class="footer-nav">
                            <a href="/index.html">Home</a>
                            <a href="/index.html#platform">Platform</a>
                            <a href="/company/team.html">About</a>
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
                    <p>&copy; ${new Date().getFullYear()} Cortivus. Transforming leaders through intelligent AI solutions.</p>
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
            // Highlight parent if child is active (specifically for Platform)
            else if (link.text === 'Platform' && currentPath.includes('/platform/')) {
                isActive = true;
            }

            const activeClass = isActive ? ' class="active"' : '';

            if (link.dropdown) {
                // Check if any dropdown item is active to highlight parent
                const isDropdownActive = link.dropdown.some(item => {
                    // Check exact match or if current path starts with dropdown item path
                    return item.href === currentPath ||
                           (item.href.endsWith('/') && currentPath.startsWith(item.href));
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
