# themarkest.me v2

Personal technology headquarters of Mark Bogdanov / TheMarkest.

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** Framer Motion + GSAP
- **3D:** Three.js + React Three Fiber + drei
- **i18n:** next-intl (RU + EN)
- **Hosting:** Firebase App Hosting

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:9002](http://localhost:9002).

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system & Tailwind v4 theme
│   ├── layout.tsx           # Root layout (fonts, metadata)
│   └── [locale]/            # i18n routing
│       ├── layout.tsx       # Locale layout (next-intl provider)
│       ├── page.tsx         # Home page
│       ├── about/
│       ├── projects/
│       │   └── [slug]/
│       ├── collaboration/
│       ├── lab/
│       ├── content/
│       ├── shop/
│       └── contact/
├── components/
│   ├── layout/              # Header, Footer
│   ├── sections/            # Page sections
│   ├── ui/                  # Reusable UI components
│   └── three/               # 3D scenes & components
├── i18n/                    # next-intl config & routing
├── lib/                     # Utilities
└── messages/                # RU/EN translation files
```

## Architecture Notes

- **Firebase App Hosting** for SSR deployment
- **next-intl** with `/ru/` and `/en/` URL prefixes
- **Progressive enhancement:** content first, then animations, then 3D
- **Fallbacks** for WebGL, reduced motion, slow connections
