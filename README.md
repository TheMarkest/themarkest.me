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

## Deployment (Firebase App Hosting)

Project ID: `themarkestmesite` · Recommended region: `us-east1` (matches `firebase.json`).

### 1. Install & login

```bash
npm i -g firebase-tools
firebase login
firebase use themarkestmesite
```

### 2. Create secrets in Cloud Secret Manager

Run once per secret. The CLI will prompt for the value:

```bash
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_API_KEY
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_PROJECT_ID
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_APP_ID
firebase apphosting:secrets:set NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
firebase apphosting:secrets:set FIREBASE_SERVICE_ACCOUNT_JSON
```

### 3. Grant the backend access to each secret

Replace `<BACKEND_ID>` with your App Hosting backend id:

```bash
firebase apphosting:secrets:grantaccess NEXT_PUBLIC_FIREBASE_API_KEY --backend <BACKEND_ID>
firebase apphosting:secrets:grantaccess NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN --backend <BACKEND_ID>
firebase apphosting:secrets:grantaccess NEXT_PUBLIC_FIREBASE_PROJECT_ID --backend <BACKEND_ID>
firebase apphosting:secrets:grantaccess NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET --backend <BACKEND_ID>
firebase apphosting:secrets:grantaccess NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID --backend <BACKEND_ID>
firebase apphosting:secrets:grantaccess NEXT_PUBLIC_FIREBASE_APP_ID --backend <BACKEND_ID>
firebase apphosting:secrets:grantaccess NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID --backend <BACKEND_ID>
firebase apphosting:secrets:grantaccess FIREBASE_SERVICE_ACCOUNT_JSON --backend <BACKEND_ID>
```

### 4. Create the App Hosting backend (connected to GitHub)

```bash
firebase apphosting:backends:create
```

Or create it from the Firebase Console UI (App Hosting → Create backend → connect this GitHub repo).

### 5. Deploy

Push to the connected branch — App Hosting will auto-build and deploy on every push.

### Prerequisites in the Firebase Console

- **Firestore** must be enabled in **Native mode**.
- **Storage** default bucket is auto-created on first use.
- **Analytics** is initialized client-side via `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`.
