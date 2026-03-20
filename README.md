# Prow Constructions Inc. — Website

Official website for **Prow Constructions Inc.**, a residential and commercial construction company.
License No. **1001527224**

## 🌐 Live Site

Deployed via GitHub Pages (or your hosting provider).

---

## 🛠️ Tech Stack

| Layer      | Technology              |
|------------|-------------------------|
| Structure  | HTML5 (semantic)        |
| Styling    | Vanilla CSS (custom properties, responsive) |
| Behaviour  | Vanilla JavaScript (ES6+) |
| Fonts      | Google Fonts — Outfit, Inter |
| Email Form | Web3Forms API           |
| Version Control | Git + GitHub       |

---

## 📁 Project Structure

```
prow-constructions/
├── index.html       # Main single-page site
├── index.css        # All styles (design tokens, components, sections)
├── main.js          # All JavaScript (navbar, form, carousel, scroll reveal)
└── assets/          # Images and logo
    ├── logo.png
    ├── hero.png
    ├── residential.png
    ├── project-office.png
    ├── project-retail.png
    └── project-industrial.png
```

---

## 🚀 Running Locally

No build step or dependencies needed. Just open the file:

**Option 1 — VS Code Live Server (recommended):**
1. Install the "Live Server" extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Site opens at `http://127.0.0.1:5500`

**Option 2 — Python HTTP Server:**
```bash
python3 -m http.server 8080
# Then open http://localhost:8080
```

---

## 📬 Contact Form Setup

The "Get a Quote" form uses [Web3Forms](https://web3forms.com) to deliver submissions to the business email.

To update the recipient email:
1. Go to [web3forms.com](https://web3forms.com)
2. Generate a new access key for the new email
3. In `main.js`, update:
   ```js
   const WEB3FORMS_ACCESS_KEY = 'your-new-key-here';
   ```

---

## 🎨 Coding Standards

- **CSS variables** for all colours, spacing, and fonts — defined in `:root`
- **BEM-inspired class names** — e.g. `.service-card`, `.service-card:hover`
- **Section comments** — every major CSS/HTML block is clearly labelled
- **No inline styles** — all styling done via CSS classes
- **Semantic HTML** — `<nav>`, `<section>`, `<footer>`, `<form>`, `<article>`
- **Accessibility** — `aria-label` on icon buttons, `alt` on all images, form `label` elements
- **Responsive** — mobile-first breakpoints at 560px, 768px, 900px, 1024px

---

## 🔖 Git Commit Convention

Use short, single-line imperative commit messages:

```
✅ Add residential section with service cards
✅ Fix mobile navbar overflow bug
✅ Update contact form email key
❌ fixed stuff
❌ WIP
```

---

## 📄 License

All rights reserved — Prow Constructions Inc. © 2026