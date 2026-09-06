# Raman Tiwari — Official Engineering Portfolio

[![GitHub Pages Deployment](https://img.shields.io/badge/deployment-live-success?style=for-the-badge&logo=githubpages&logoColor=white&color=D4874D)](https://ramantiw45.github.io/Portfolio/)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber.svg?style=for-the-badge&color=C06D3A)](LICENSE)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=for-the-badge&color=2B9E6F)](https://ramantiw45.github.io/Portfolio/)
[![Vanilla Web Standards](https://img.shields.io/badge/built%20with-HTML5%20%7C%20CSS3%20%7C%20ES6+-blue.svg?style=for-the-badge&color=121110)](https://ramantiw45.github.io/Portfolio/)

> **Live Deployment**: [ramantiw45.github.io/Portfolio](https://ramantiw45.github.io/Portfolio/)  
> **LinkedIn**: [linkedin.com/in/ramantiw45](https://www.linkedin.com/in/ramantiw45/)  
> **GitHub**: [github.com/ramantiw45](https://github.com/ramantiw45)  
> **Inquiries**: [work.ramantiwari@gmail.com](mailto:work.ramantiwari@gmail.com)

---

## 📌 Executive Summary

Welcome to the official source repository for **Raman Tiwari's** personal portfolio. Engineered with an editorial philosophy, this website serves as a high-performance digital showcase of software engineering projects, backend architecture, technical competencies, and academic milestones.

Crafted strictly with **vanilla web standards** (HTML5, CSS3, and modern ES6+ JavaScript), the application delivers a zero-runtime-overhead experience with bespoke warm copper aesthetics, frosted glassmorphism, responsive tactile micro-interactions, and search engine optimization (SEO).

---

## 📑 Table of Contents

- [Executive Summary](#-executive-summary)
- [Design Philosophy & UI/UX](#-design-philosophy--uiux)
- [Featured Engineering Projects](#-featured-engineering-projects)
- [Technical Architecture & Key Systems](#-technical-architecture--key-systems)
- [Search Engine Optimization (SEO) & Discoverability](#-search-engine-optimization-seo--discoverability)
- [Tech Stack Overview](#-tech-stack-overview)
- [Repository Structure](#-repository-structure)
- [Local Setup & Development](#-local-setup--development)
- [Recommended GitHub Repository Topics](#-recommended-github-repository-topics)
- [License & Contact](#-license--contact)

---

## 🎨 Design Philosophy & UI/UX

This platform was designed from first principles to depart from generic boilerplate templates:

1. **Warm Metallic Copper Palette**: Built around obsidian neutrals (`#2D2820`), creamy linen canvases (`#FAFAF8`), and warm metallic copper accents (`#D4874D` / `#C06D3A`), deliberately avoiding conventional blue tones for a distinctive, tactile identity.
2. **Editorial Typography System**:
   - **Outfit**: Geometric sans-serif display headers.
   - **Newsreader & Lora**: Editorial serif typefaces for story titles, milestone values, and thought highlights.
   - **Plus Jakarta Sans**: Crisp, legible UI copy, navigation links, and code metadata.
   - **Caveat**: Handwritten signature branding.
3. **Multi-Layered Spatial Parallax**: Normalized cursor-tracking depth physics powered by linear interpolation (`lerp`) and `requestAnimationFrame`, with complete gyroscope support for mobile devices.
4. **Zero-Dependency Core**: Zero npm runtime packages, zero CSS frameworks, zero bundler lock-in. Delivers instant First Contentful Paint (FCP) and near-perfect Core Web Vitals.

---

## 🚀 Featured Engineering Projects

| Project | Domain / Stack | Key Highlights | Repository / Demo |
|---|---|---|---|
| **[Enterprise API Rate Limiter](https://github.com/ramantiw45/api-rate-limiter)** | Backend Systems · Edge Gateway<br>*(Java 21, Spring Cloud Gateway, Redis, Resilience4j, Docker, Prometheus, Grafana)* | • Atomic token bucket rate enforcement via Redis Lua scripts.<br>• Constant-time SHA-256 API key authentication with credential stripping.<br>• Circuit breaker fault isolation and automated 5-node Sentinel failover.<br>• Distributed tracing (OpenTelemetry/Zipkin) & provisioned Grafana dashboards. | [Source Code](https://github.com/ramantiw45/api-rate-limiter) |
| **[Personal Portfolio Website](https://github.com/ramantiw45/Portfolio)** | Frontend · Design Systems<br>*(HTML5, CSS3, JavaScript ES6+, FormSubmit REST API)* | • Bespoke luminous glass design system with CSS custom properties.<br>• Interactive reading progress bar, back-to-top floating glass control, and one-click copy email micro-interaction.<br>• Tactile AJAX contact validation with honeypot spam protection & mailto protocol fallback. | [Live Site](https://ramantiw45.github.io/Portfolio/) · [Source](https://github.com/ramantiw45/Portfolio) |

---

## ⚙️ Technical Architecture & Key Systems

### 1. Interactive Micro-Interactions & State Management
- **Reading Progress Bar**: A 3px copper gradient indicator fixed to the viewport tracking exact document scroll percentage via passive scroll observers.
- **Floating Back-to-Top Action**: A glassmorphic button with spring elevation, automatically fading in past the hero section with mobile-safe dismissal.
- **One-Click Clipboard Utility**: Asynchronous `navigator.clipboard` integration with fallback support, tactile icon morphing, and spring-animated tooltip confirmation.
- **Contact Form Tactile Feedback**: Real-time tabular character counter (`0 / 500`) with dynamic threshold warnings and input validation indicators.

### 2. Resilient Contact Form Pipeline
- Non-blocking AJAX submission targeting FormSubmit REST endpoints.
- Multi-tier validation: name length constraints, strict RFC-compliant email regex, and message bounds.
- Screen-reader safe honeypot trap (`_honey`) preventing automated spam without CAPTCHA friction.
- Graceful degradation with dynamic direct `mailto:` protocol generation upon network failure.

---

## 🔍 Search Engine Optimization (SEO) & Discoverability

To maximize organic discoverability on Google, Bing, DuckDuckGo, and GitHub Search:

- **Canonical URL Declaration**: Explicit canonical link pointing to `https://ramantiw45.github.io/Portfolio/` preventing mirror duplication penalties.
- **Schema.org Structured Data (JSON-LD)**: Complete linked-data entity graph declaring `Person` and `WebSite` schemas for Google Knowledge Graph integration, connecting alumni affiliations, professional profiles, and technical proficiencies.
- **OpenGraph & Twitter Card Protocols**: Rich media social cards featuring absolute image URLs, dimensions (1024x1024), author metadata, and optimized descriptions for LinkedIn, Twitter/X, and WhatsApp previews.
- **Robots & Sitemap**: Standard `robots.txt` and `sitemap.xml` files enabling rapid search bot indexing.
- **Semantic Hierarchy**: Strict HTML5 semantic structure (`<nav>`, `<section>`, `<article>`, `<footer>`) with explicit heading levels (`h1`–`h3`) and descriptive ARIA labels.

---

## 🛠️ Tech Stack Overview

| Layer | Technologies |
|---|---|
| **Markup & Semantics** | Semantic HTML5, Scalable Vector Graphics (SVG) |
| **Styles & Theming** | Vanilla CSS3 (Custom Properties, Glassmorphism, CSS Grid, Flexbox, Animations) |
| **Interactivity** | Vanilla JavaScript (ES6+, IntersectionObserver, Clipboard API, RequestAnimationFrame) |
| **Typography** | Google Fonts (*Outfit*, *Newsreader*, *Lora*, *Plus Jakarta Sans*, *Caveat*) |
| **Contact Backend** | FormSubmit AJAX REST Service + Protocol Fallback |
| **Hosting & CI/CD** | GitHub Pages (Continuous Deployment from `main`) |

---

## 📂 Repository Structure

```text
Portfolio/
├── assets/
│   ├── 1788676371342.png        # High-resolution profile avatar
│   ├── favicon.png              # Optimized 64x64 pixel art favicon
│   └── raman-photo.png          # Supplemental photography asset
├── css/
│   └── style.css                # Complete design system tokens, typography & responsive layouts
├── js/
│   └── main.js                  # Application controllers, observers, parallax, & form logic
├── index.html                   # Semantic markup, meta headers & JSON-LD structured data
├── robots.txt                   # Search crawler directives
├── sitemap.xml                  # XML sitemap for search engine indexing
├── README.md                    # Repository documentation and SEO hub
└── .gitignore                   # Multi-platform version control ignore rules
```

---

## 💻 Local Setup & Development

This repository is built without external build dependencies or package managers:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ramantiw45/Portfolio.git
   cd Portfolio
   ```

2. **Serve locally**:
   Open `index.html` directly in any modern browser, or launch a lightweight local server:
   ```bash
   # Using Python 3
   python -m http.server 3000

   # Or using Node.js
   npx serve .
   ```

3. Navigate to `http://localhost:3000`.

---

## 🏷️ Recommended GitHub Repository Topics

To ensure high visibility on GitHub explore feeds and internal repository searches, add these topics in your GitHub repository settings (*About > Edit repository details > Topics*):

```text
portfolio, developer-portfolio, backend-developer, java, spring-cloud, redis, distributed-systems, system-design, vanilla-javascript, glassmorphism, design-system, tcet, mumbai
```

---

## 📄 License & Attribution

This project is licensed under the **MIT License**.  
Designed, developed, and maintained by **[Raman Tiwari](https://github.com/ramantiw45)**.
