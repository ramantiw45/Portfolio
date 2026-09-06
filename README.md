# Raman Tiwari — Personal Portfolio

An editorial-grade personal portfolio website showcasing software engineering projects, technical skills, and academic milestones. Engineered with modern vanilla web standards, high-performance micro-interactions, and a bespoke warm copper design system.

🔗 **Live Deployment**: [ramantiw45.github.io/Portfolio](https://ramantiw45.github.io/Portfolio/)  
💼 **LinkedIn**: [linkedin.com/in/ramantiw45](https://www.linkedin.com/in/ramantiw45/)  
📬 **Contact**: [work.ramantiwari@gmail.com](mailto:work.ramantiwari@gmail.com)  

---

## 🧭 Overview & Design Philosophy

This portfolio was designed from the ground up to break away from generic templates, delivering a tactile, editorial digital experience tailored for engineering and backend problem-solving.

- **Warm Metallic Palette**: Built strictly around deep obsidian neutrals, frosted glass accents, and metallic copper tones (`#D4874D` / `#C06D3A`), completely avoiding conventional blue shades for a distinctive visual identity.
- **Editorial Typography**: Pairing **Outfit** for structured headings, **Newsreader** & **Lora** for editorial warmth and quote-worthy moments, and **Plus Jakarta Sans** for crisp, highly readable interface copy.
- **Micro-Interactions & Depth**: Multi-layer 3D parallax tracking powered by linear interpolation (`lerp`), smooth cubic-eased counter animations, and SVG progress indicators.
- **Zero-Dependency Architecture**: Crafted purely with vanilla HTML5, CSS3, and modern ES6+ JavaScript for instant page loads, zero runtime overhead, and optimal browser compatibility.

---

## ⚡ Key Engineering Highlights

### 1. Interactive Parallax & Spatial Depth
- Dynamic mouse-movement tracking calculating normalized coordinates with smooth interpolation (`requestAnimationFrame`).
- Multi-layered card composition featuring independent background depth, foreground glass framing, and floating skill badges with proportional physics.
- Responsive fallback and device orientation sensor support for mobile devices, respecting the user's `prefers-reduced-motion` settings.

### 2. Resilient Contact Handling
- Asynchronous form submission powered by the FormSubmit AJAX service with structured JSON payloads.
- Multi-tier validation:
  - Client-side input format verification (name length, regex email matching, message minimums).
  - Accessibility-safe honeypot trap (`_honey`) to prevent automated spam without degrading screen-reader experiences.
  - Context-aware UI feedback states (sending indicators, success confirmations, and error alerts).
  - Built-in graceful degradation providing an auto-populated direct `mailto:` fallback link if network requests are interrupted.

### 3. Accessible & SEO-Optimized Foundation
- Semantic HTML5 document hierarchy (`<nav>`, `<section>`, `<article>`, `<footer>`).
- Direct keyboard navigation support via skip links and complete ARIA attributes.
- Comprehensive OpenGraph metadata and structured title/description tags for social previews.

---

## 📂 Project Structure

```text
Portfolio/
├── assets/                  # High-resolution media, photography, and icons
├── css/
│   └── style.css            # Complete design system tokens, layout & responsive rules
├── js/
│   └── main.js              # Core application logic, observers, parallax & form handling
├── index.html               # Semantic markup and structure
├── README.md                # Project documentation
└── .gitignore               # Multi-platform version control ignore rules
```

---

## 🛠️ Tech Stack

| Domain | Technology |
|---|---|
| **Structure** | Semantic HTML5, SVG Vectors |
| **Styling** | Vanilla CSS3 (Custom Properties, Glassmorphism, CSS Grid & Flexbox) |
| **Interactivity** | Vanilla JavaScript (ES6+, IntersectionObserver API, RequestAnimationFrame) |
| **Typography** | Google Fonts (*Outfit*, *Newsreader*, *Plus Jakarta Sans*, *Lora*, *Caveat*) |
| **Backend / Mail** | FormSubmit AJAX REST API + Mailto Fallback Protocol |
| **Hosting** | GitHub Pages (Continuous Deployment from `main`) |

---

## 🚀 Local Development

To run this project locally without any package manager or build step:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ramantiw45/Portfolio.git
   cd Portfolio
   ```

2. **Serve the project**:
   You can open `index.html` directly in your browser, or spin up a local development server:
   ```bash
   # Using Python 3
   python -m http.server 3000

   # Or using Node.js
   npx serve .
   ```

3. Open `http://localhost:3000` in your preferred web browser.

---

## 📄 License & Attribution

Designed and developed by **Raman Tiwari**.  
Feel free to explore the code for learning purposes and inspiration.
