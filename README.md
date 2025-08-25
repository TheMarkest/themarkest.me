# TheMarkest Portfolio (Static / GitHub Pages)

This repository now serves a fully static version of the portfolio using plain HTML, CSS, and vanilla JS + Three.js.

## Structure

- `docs/` – Published GitHub Pages site (configure Pages: Branch = `master`, Folder = `/docs`).
- `public/` – Static assets (favicon, logo).
- `main.js`, `styles.css` (also imported inside `docs/`).
- Legacy Next.js / config files removed to simplify hosting.

## Development
Open `docs/index.html` directly or run a lightweight local server:

PowerShell:
```
python -m http.server 8080
```
Then: http://localhost:8080/docs/

## Internationalization
Simple in-file dictionaries (EN/RU) in `main.js` with `data-i18n` attributes.

## Three.js Skill Sphere
Renders randomized distribution of skill spheres sized by importance. Hover to view names.

## Updating Content
- Skills / Projects / Services / Achievements arrays inside `main.js`.
- Contact links inside `docs/index.html`.

## Future Ideas
- Add image thumbnails for projects.
- Add form backend (Formspree / static email obfuscation).
- Generate skill positions deterministically (hash-based) for consistency.

MIT License (if desired) – feel free to add a LICENSE file.
