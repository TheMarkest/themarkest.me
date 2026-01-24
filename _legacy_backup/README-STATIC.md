# Static Version (GitHub Pages)

This folder now contains a static HTML/CSS/JS rebuild of the original Next.js + Tailwind portfolio so it can be hosted directly on GitHub Pages.

## Key Changes

- Removed Next.js, React, Tailwind, shadcn components, Firebase configs.
- Added `index.html`, `styles.css`, `main.js` with vanilla JavaScript.
- Inlined i18n dictionaries derived from original `en.json` and `ru.json` (trimmed minimally to keys actually used in this lightweight UI).
- Implemented simplified sections: Hero + animated Three.js skill sphere, Achievements timeline, Services grid, Projects grid, Contact stub.
- Added minimal Three.js particle-based skill visualization.
- Added `.nojekyll` to prevent GitHub Pages from altering directories.

## Deploy to GitHub Pages

1. Commit and push changes to `master` or `main`.
2. In repository settings, enable GitHub Pages with Source = `Deploy from a branch`, Branch = `master` (root).
3. Visit the published site URL once the build completes.

## Customization

- Update contact links in `index.html` (Telegram + email).
- Adjust skills / projects in `main.js` arrays.
- Extend translations by adding keys to the locale objects in `main.js` and `data-i18n` attributes in HTML.

## Development

Because everything is static, you can just open `index.html` in a browser. For local dev with live reload, you can run a simple server, e.g. PowerShell:

```
powershell -Command "Start-Process powershell -ArgumentList '-NoExit','-Command','cd $PWD; python -m http.server 8000'"
```
Then open http://localhost:8000/

## Future Enhancements (Optional)

- Add accessibility enhancements for canvas (fallback text list of skills).
- Add basic form backend using a service (e.g., Formspree / Netlify Forms) if needed.
- Generate project cards from a JSON file instead of hard-coded array.
- Optimize Three.js bundle by custom build or replacing with a lightweight canvas rendering.

---
MIT License applies to added code unless otherwise specified.
