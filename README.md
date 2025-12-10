# Cortivus - Intelligence in Action

**Lead with Precision. Scale with AI.**

Cortivus is a hybrid capabilities firm: part **Executive Education** provider, part **Product Studio**. We help healthcare leaders and organizations bridge the gap between human wisdom and machine speed.

## 🚀 Project Overview

This website serves as the digital headquarters for Cortivus, showcasing our dual mission:

1. **Executive Education**: Mentoring CMOs and Hospital Leaders to navigate the AI era.
2. **Product Portfolio**: Building and shipping AI tools that solve real problems in Health, Faith, and Hospitality.

### Key Pillars

* **Executive Education (`/education`)**: High-touch mentorship and strategy.
* **Execution Accelerant (`/portfolio/execution`)**: Tools like *Project Writer* to operationalize strategy.
* **Innovation Lab (`/portfolio`)**: Our incubator for *Journey2Health*, *Sermon Generator*, and *MakeItADouble*.

## 🛠️ Development

This project is built with **Vanilla HTML, CSS, and JavaScript** to ensure speed, simplicity, and ease of deployment (GitHub Pages).

### Prerequisites

* Python 3.x (standard on most machines)

### Running Locally

To view the site locally, we use Python's built-in HTTP server to ensure absolute paths work correctly.

1. Open your terminal in the project root:

    ```bash
    cd c:\Projects\Cortivus-Web-Site
    ```

2. Start the server:

    ```bash
    python -m http.server
    ```

3. Open your browser to:
    [http://localhost:8000](http://localhost:8000)

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
*© 2025 Cortivus*
