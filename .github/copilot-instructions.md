# themarkest.me v2 — Project Instructions

## Project Overview
Персональный технологический сайт-визитка Mark Bogdanov / TheMarkest.
Премиальный dark-tech эстетика. Двуязычный (RU по умолчанию + EN).

## Stack (актуальный)
- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript 5.8
- **Styling:** Tailwind CSS v4 (CSS-first config в `src/app/globals.css`, БЕЗ tailwind.config.ts)
- **Animation:** Framer Motion v11 + GSAP v3.12
- **3D:** Three.js v0.172 + @react-three/fiber v9 + @react-three/drei v10
- **i18n:** next-intl v4 (locales: `ru`, `en`; defaultLocale: `ru`; localePrefix: `always`)
- **CMS:** Payload CMS (self-hosted, часть проекта)
- **Hosting:** Firebase App Hosting (project: `themarkestmesite`)
- **Media Storage:** Firebase Storage
- **Fonts:** Handjet (display, cyrillic+latin), Inter (body), JetBrains Mono (mono)
- **Utils:** zod, clsx, tailwind-merge, class-variance-authority, lucide-react

## НЕ используем (не добавлять)
- ❌ Sanity CMS → используем Payload CMS
- ❌ Vercel → используем Firebase App Hosting
- ❌ Space Grotesk → используем Handjet
- ❌ styled-components / CSS Modules → используем Tailwind CSS v4
- ❌ i18next → используем next-intl

## Design System
Все переменные определены в `src/app/globals.css` через `@theme`:
- **BG:** `#0a0a0f` (глубокий тёмный)
- **Accent:** `#00e5ff` (cyan)
- **Signal:** `#ff3366` (красно-розовый)
- **Surface:** `#12121a`, `#1a1a2e`
- **Text:** `#e0e0e8` (primary), `#8888a0` (secondary)

## Key Conventions
- **Root layout** (`src/app/layout.tsx`) — только metadata, pass-through (`return children`)
- **Locale layout** (`src/app/[locale]/layout.tsx`) — fonts, NextIntlClientProvider, Header, Footer
- Все страницы — в `src/app/[locale]/`
- Переводы — в `src/messages/ru.json` и `en.json`
- `cn()` утилита — в `src/lib/utils.ts` (clsx + tailwind-merge)
- Компоненты: `src/components/{layout,sections,ui,three}/`

## Build & Dev
```bash
npm run dev        # порт 9002
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## Правила для агентов
1. Весь UI-текст — через `useTranslations()` из next-intl, НИКОГДА хардкод строк
2. При добавлении текста — обновлять ОБА файла переводов (ru.json + en.json)
3. Tailwind v4: стили через `@theme` block в globals.css, НЕ через tailwind.config
4. Компоненты именовать PascalCase, файлы — PascalCase.tsx
5. Серверные компоненты по умолчанию; `'use client'` только когда нужны хуки/интерактивность
6. Анимации: Framer Motion для UI, GSAP для сложных таймлайнов, Three.js для 3D
7. Все изображения — через `next/image` с Firebase Storage remote patterns
8. Доступность: semantic HTML, ARIA labels, keyboard navigation, reduced-motion fallbacks
