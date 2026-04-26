# Промпт для старта разработки themarkest.me v2

> Скопируй этот промпт целиком в новый чат для начала разработки.

---

## Контекст

Ты работаешь с проектом **themarkest.me v2** — персональный технологический сайт-визитка Mark Bogdanov / TheMarkest. Проект полностью подготовлен к разработке, инфраструктура настроена, все проверки проходят.

## Текущее состояние

### Готово и работает ✅
- **Next.js 15.2.8** (App Router) + React 19 + TypeScript 5.8
- **Tailwind CSS v4** с полной design system в `src/app/globals.css` (`@theme` block)
- **next-intl v4** — i18n полностью настроен (RU по умолчанию + EN), middleware, routing, 62 ключа переводов
- **Framer Motion v11 + GSAP v3.12** — установлены, Framer Motion уже используется в HeroSection
- **Three.js v0.172 + R3F v9 + drei v10** — установлены, компоненты пока не созданы
- **Firebase App Hosting** — проект `themarkestmesite`, аккаунт `markbogdanovofficial@gmail.com`, конфиги готовы
- **ESLint** — настроен (`next/core-web-vitals` + `next/typescript`), 0 ошибок
- **Главная страница** — 4 секции: HeroSection, ProjectsPreview, CapabilitiesSection, ContactCTA
- **Header** — навигация (7 пунктов) + LanguageSwitcher
- **Footer** — ссылки на privacy/terms
- **12 маршрутов** — все созданы как заглушки с локализованным текстом
- **Все проверки проходят**: `npm run build` ✅, `npm run typecheck` ✅, `npm run lint` ✅

### Не создано (предстоит) 📋
- Интеграция **Payload CMS** (self-hosted, часть проекта) — коллекции, admin, API
- **3D hero-сцена** — `src/components/three/` пустой, Three.js/R3F установлены
- **Полноценные страницы** — about, projects, collaboration, lab, content, shop, contact (сейчас заглушки)
- **Дополнительные секции главной**: Trust Indicators, Positioning, Ecosystem, Bureau, Shop teaser
- **Мобильная навигация** — burger-меню (десктоп работает, мобильный hidden)
- **Формы** — contact page с валидацией (zod)
- **Error boundaries** + loading states (`error.tsx`, `loading.tsx`)
- **SEO** — per-page metadata, `robots.txt`, `sitemap.xml`
- **Аналитика** — Firebase Analytics
- **Первый деплой** на Firebase App Hosting

## Стек и правила

Прочитай файлы:
1. `.github/copilot-instructions.md` — общие правила проекта, стек, запреты
2. `.github/AGENT_TEAM.md` — состав команды субагентов, матрица маршрутизации задач, порядок выполнения
3. `.github/agents/*.agent.md` — инструкции для каждого субагента

### Ключевые запреты
- ❌ Sanity CMS → используем **Payload CMS**
- ❌ Vercel → используем **Firebase App Hosting**
- ❌ Space Grotesk → используем **Handjet**
- ❌ tailwind.config.ts → **Tailwind v4 CSS-first** через `@theme` в globals.css
- ❌ Хардкод UI-текста → **только** `useTranslations()` из next-intl
- ❌ CSS Modules / styled-components → **только Tailwind**

### Команды
```bash
npm run dev        # порт 9002
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint (ESLint)
```

## Задача

Начни с приоритетных задач в таком порядке:

### Фаза 1 — Ядро (рекомендуемый старт)
1. **Мобильная навигация** — burger-меню в Header для мобильных устройств
2. **About page** — полноценная страница «О Марке» с bio, timeline, skills
3. **Projects page** — страница проектов с фильтрацией, карточки проектов
4. **Секции главной** — Trust Indicators, Positioning, Ecosystem

### Фаза 2 — Контент и CMS
5. **Payload CMS** — интеграция, коллекции (projects, media), admin panel
6. **Contact page** — форма с zod-валидацией
7. **Shop page** — витрина товаров/мерча

### Фаза 3 — Визуал и деплой
8. **3D Hero** — Three.js сцена для главной (particles, procedural geometry)
9. **SEO** — per-page metadata, sitemap.xml, robots.txt, OG images
10. **Первый деплой** — Firebase App Hosting

Перед началом работы прочитай инструкции агентов и выбери задачу из Фазы 1. Для каждой задачи следуй порядку из AGENT_TEAM.md: i18n (переводы) → Frontend (компонент) → Animation (анимации) → DevOps (проверка build).
