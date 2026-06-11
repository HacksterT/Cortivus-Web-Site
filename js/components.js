/**
 * Cortivus Shared Components
 * Handles the injection of Header and Footer across all pages to reduce code duplication.
 */

const CortivusComponents = {
    // Configuration for navigation links
    navLinks: [
        { text: 'Home', href: '/index.html' },
        { text: 'The Practice', href: '/practice/' },
        { text: 'SAFE AI', href: '/safe-ai/' },
        {
            text: 'Insights',
            href: '/insights/',
            children: [
                { text: 'Insights Hub',  href: '/insights/',                    icon: 'fa-lightbulb',       desc: 'Evidence, analysis, and practice briefings' },
                { text: 'The Tracker',   href: '/insights/tracker/',             icon: 'fa-broadcast-tower', desc: 'Live case law and regulatory updates' },
                { text: 'The Signal',    href: '/insights/tracker/signal/',      icon: 'fa-wave-square',     desc: 'Evidence patterns from peer-reviewed literature' },
                { text: 'Briefings',     href: '/insights/briefings/',           icon: 'fa-file-alt',        desc: 'Practice briefings anchored to the SAFE AI framework' }
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
                        <p class="footer-motto">Clinical AI safety, audit, and governance for hospitals putting AI into care.</p>
                    </div>

                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <nav class="footer-nav">
                            <a href="/index.html">Home</a>
                            <a href="/practice/">The Practice</a>
                            <a href="/safe-ai/">SAFE AI</a>
                            <a href="/insights/">Insights</a>
                            <a href="/company/team.html">About</a>
                            <a href="/index.html#contact">Contact</a>
                        </nav>
                    </div>

                    <div class="footer-section">
                        <h4>Legal</h4>
                        <nav class="footer-nav">
                            <a href="/legal/terms.html">Terms of Service</a>
                            <a href="/legal/privacy.html">Privacy Policy</a>
                            <a href="/legal/refund.html">Refund Policy</a>
                        </nav>
                    </div>

                    <div class="footer-section">
                        <h4>Credentials</h4>
                        <div class="footer-badges">
                            <span class="badge">NVIDIA Inception</span>
                            <span class="badge">Google for Startups</span>
                            <span class="badge">Physician-Led</span>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>&copy; ${new Date().getFullYear()} Cortivus. Clinical AI safety for the hospitals putting it into care.</p>
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

        function matchesPath(href) {
            if (href === currentPath) return true;
            if (href.endsWith('/') && currentPath === href + 'index.html') return true;
            if (href.endsWith('/') && href.length > 1 && currentPath.startsWith(href)) return true;
            if (href === '/index.html' && (currentPath === '/' || currentPath === '/index.html')) return true;
            return false;
        }

        return this.navLinks.map(link => {
            if (link.children) {
                // Most-specific match wins: /insights/tracker/signal/ beats /insights/tracker/ beats /insights/
                const matches = link.children.filter(c => matchesPath(c.href));
                matches.sort((a, b) => b.href.length - a.href.length);
                const bestMatch = matches[0] || null;
                const toggleClass = 'dropdown-toggle' + (bestMatch ? ' active' : '');
                const childItems = link.children.map(child => {
                    const childActive = bestMatch && child.href === bestMatch.href;
                    const classAttr = childActive ? ' class="active"' : '';
                    return `<li><a href="${child.href}"${classAttr}>` +
                        `<span class="dd-item-label"><i class="fas ${child.icon}"></i> ${child.text}</span>` +
                        `<span class="dd-item-desc">${child.desc}</span>` +
                        `</a></li>`;
                }).join('');
                return `<li class="dropdown">` +
                    `<a href="${link.href}" class="${toggleClass}">${link.text} <i class="fas fa-chevron-down"></i></a>` +
                    `<ul class="dropdown-menu">${childItems}</ul>` +
                    `</li>`;
            }

            const isActive = matchesPath(link.href);
            const classes = [];
            if (isActive) classes.push('active');
            if (link.className) classes.push(link.className);
            const classAttr = classes.length ? ` class="${classes.join(' ')}"` : '';
            return `<li><a href="${link.href}"${classAttr}>${link.text}</a></li>`;
        }).join('');
    }
};
