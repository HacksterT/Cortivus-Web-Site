# Cortivus Website

This repository contains the source code for the Cortivus company website, a static site hosted on GitHub Pages.

## Overview

Cortivus is a product studio developing AI-powered applications that solve real-world problems across health, lifestyle, and learning. This website showcases our core products including Journey2Health (digital health assistant), Sermon Generator (faith-based content creation), and MakeItADouble (smart bar assistant), plus our enterprise platform for healthcare execution. The site features a modern, responsive design with dropdown navigation and modular CSS architecture.

## Features

- Responsive design that works on mobile, tablet, and desktop devices
- Modern UI with animated elements and gradients
- Product showcase with detailed information pages
- Dropdown navigation menu for enterprise and consumer solutions
- Dedicated execution platform page for healthcare leaders
- Contact form integration using Formspree
- Smooth scrolling navigation
- CSS Grid and Flexbox layout
- Modular CSS architecture for easy maintenance

## Technology Stack

- HTML5
- CSS3 (modular architecture with @import, custom variables, animations, and responsive design)
- Vanilla JavaScript (ES6+)
- Font Awesome for icons
- GitHub Pages (static site hosting)
- Formspree for form handling

**Hosting:** This site is deployed as a static website on GitHub Pages at `https://cortivus.com`, with automatic deployment from the main branch.

## Development

### Local Development

To work on this website locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/HacksterT/Cortivus.github.io.git
   ```

2. Open the project in your preferred code editor.

3. Make changes to the HTML, CSS, or JavaScript as needed.

4. Test your changes by opening the `index.html` file in a web browser.

### FormSpree Integration

The contact form uses [FormSpree](https://formspree.io/) for processing form submissions without requiring a backend server:

1. The form in `index.html` includes an action URL pointing to FormSpree:

   ```html
   <form action="https://formspree.io/f/xwpbrabj" method="POST">
   ```

2. When users submit the form, FormSpree handles the submission and emails the form data to the registered email address.

3. To modify the form destination:
   - Create an account on FormSpree
   - Set up a new form and get a new endpoint
   - Replace the existing endpoint in the form action attribute

### Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch:

1. Commit your changes:

   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. Push to GitHub:

   ```bash
   git push origin main
   ```

3. GitHub Pages will automatically build and deploy the site to the custom domain `https://cortivus.com`.

## Custom Domain

This site is hosted on GitHub Pages with the custom domain `cortivus.com`, configured via the CNAME file. The domain setup includes:

1. A CNAME file in the repository root containing the domain name
2. DNS settings with the domain registrar pointing to GitHub Pages
3. GitHub Pages settings configured to use the custom domain

If you need to change the domain in the future:

1. Update the CNAME file with the new domain
2. Update DNS settings with your domain registrar
3. Configure GitHub Pages settings in the repository

## CSS Architecture

The website uses a modular CSS structure for maintainability and scalability:

```
css/
├── core.css          # Variables, resets, base styles
├── navigation.css    # Header, nav, dropdown menu
├── hero.css          # Hero sections & showcases
├── sections.css      # About, services, contact
├── components.css    # Buttons, cards, badges
├── platform.css      # Platform modules, roadmap
├── footer.css        # Footer styles
└── responsive.css    # Mobile/tablet breakpoints
```

The main `styles.css` imports these modules in the correct order. Original monolithic CSS backed up as `styles.old.css`.

### Project Structure

```plaintext
cortivus_website/
├── index.html                  # Main homepage
├── execution.html              # Healthcare execution platform page
├── portfolio.html              # Product portfolio page
├── team.html                   # Team page
├── styles.css                  # Main stylesheet (imports modules)
├── styles.old.css              # Backup of original monolithic CSS
├── README.md                   # Project documentation
│
├── css/                        # Modular CSS architecture
│   ├── core.css                # Variables, resets, base styles
│   ├── navigation.css          # Header, nav, dropdown
│   ├── hero.css                # Hero sections
│   ├── sections.css            # About, services, contact
│   ├── components.css          # Buttons, cards, badges
│   ├── platform.css            # Platform modules, roadmap
│   ├── footer.css              # Footer styles
│   └── responsive.css          # Mobile/tablet breakpoints
│
├── images/                     # Website images and assets
│
├── js/                         # JavaScript files
│   └── main.js                 # Navigation and UI interactions
│
└── archive/                    # Archived/deprecated code
    ├── chatbot/                # Removed chatbot implementation
    └── chatbot-loader.js       # Chatbot loader script
```

This structure provides:

- **Modular CSS** for easy maintenance and feature additions
- **Clear separation** between page types (consumer vs enterprise)
- **Scalable architecture** ready for future growth
- **GitHub Pages compatibility** with static assets

## Recent Updates

- **CSS Modularization**: Reorganized 1445-line CSS into 8 focused modules for better maintainability
- **New Execution Platform Page**: Added dedicated page for healthcare execution accelerant with roadmap timeline
- **Dropdown Navigation**: Implemented hover/mobile-friendly dropdown menu separating enterprise and consumer solutions
- **Platform Components**: Created module cards, roadmap timeline, and phase markers for execution page
- **Responsive Design**: Enhanced mobile navigation with accordion-style dropdowns

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For questions about this website, please contact [servingyou@cortivus.com](mailto:servingyou@cortivus.com).
