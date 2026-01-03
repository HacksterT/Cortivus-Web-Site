# Cortivus - Intelligence in Action

**Lead with Precision. Scale with AI.**

Cortivus is a hybrid capabilities firm: part **Executive Education** provider, part **Product Studio**. We help healthcare leaders and organizations bridge the gap between human wisdom and machine speed.

## 🚀 Project Overview

This website serves as the digital headquarters for Cortivus, showcasing our dual mission:

1. **Executive Education**: Mentoring CMOs and Hospital Leaders to navigate the AI era.
2. **Product Portfolio**: Building and shipping AI tools that solve real problems in Health, Faith, and Hospitality.

### Key Pillars

* **Executive Education (`/education`)**: High-touch mentorship and strategy.
* **Execution Accelerant (`/portfolio/execution`)**: Tools like *The Architect* to operationalize strategy.
* **Innovation Lab (`/portfolio`)**: Our incubator for *Journey2Health*, *Sermon Generator*, and *MakeItADouble*.

## 🛠️ Development

This project is built with **Vanilla HTML, CSS, and JavaScript** to ensure speed, simplicity, and ease of deployment (GitHub Pages).

### Prerequisites

* Python 3.x (standard on most machines)

### Branch Workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production - deployed to GitHub Pages (cortivus.com) |
| `dev` | Development - test changes here before merging to main |

**Workflow:**
1. Always work on `dev` branch
2. Test locally before committing
3. When ready to deploy, merge `dev` into `main` and push

### Running Locally

Use the included batch script to start a local server on port 4000:

```bash
.\serve.bat
```

Then open [http://localhost:4000](http://localhost:4000)

**Note:** Port 4000 is registered in the project port registry to avoid conflicts with other local services.

## 📂 Project Structure

```
Cortivus-Web-Site/
├── education/          # Executive Education Landing Page
├── portfolio/          # New Product Portfolio Hub
│   ├── execution/      # Execution Accelerant Product Page
│   ├── journey2health/ 
│   └── sermon-generator/
├── company/            # Team and About links
├── css/                # centralized styles (navigation.css, education.css, etc.)
├── js/                 # centralized scripts (components.js used for header/footer injection)
└── index.html          # Main Home Page
```

## 🎨 Design Philosophy

* **Aesthetic**: "Executive Premium" – Dark modes, Cyan/Aqua accents, clean typography.
* **UX**: "Smart Navigation" – Dropdowns and active states handled via `components.js`.

---
*© 2026 Cortivus*
