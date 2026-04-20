# themarkest.me v2 — Инструкция по работе команды субагентов

## Обзор

Проект **themarkest.me** разделён на домены ответственности. Каждый субагент — специалист в своей области со строгими границами. Главный агент (orchestrator) распределяет задачи между ними.

## Состав команды

| Агент | Файл | Специализация | Инструменты |
|-------|-------|--------------|-------------|
| **Frontend** | `frontend.agent.md` | React-компоненты, страницы, Tailwind, вёрстка | read, edit, search, agent |
| **3D** | `three-d.agent.md` | Three.js, R3F, WebGL-сцены, шейдеры | read, edit, search |
| **Animation** | `animation.agent.md` | Framer Motion, GSAP, микро-анимации | read, edit, search |
| **CMS** | `cms.agent.md` | Payload CMS, контент-модели, API | read, edit, search, execute |
| **i18n** | `i18n.agent.md` | Переводы, next-intl, locale routing | read, edit, search |
| **DevOps** | `devops.agent.md` | Firebase, CI/CD, SEO, производительность | read, edit, search, execute |

## Принципы оркестрации

### 1. Правило единой ответственности
Каждый агент делает ТОЛЬКО то, что в его домене. Если задача пересекает домены — orchestrator разбивает её и раздаёт по частям.

**Пример:** «Добавить секцию Trust Indicators на главную»
1. **i18n** → создаёт ключи переводов в `ru.json` + `en.json`
2. **Frontend** → строит компонент `TrustSection.tsx` с `useTranslations()`
3. **Animation** → добавляет анимации появления (fade-up, stagger)

### 2. Порядок выполнения
При комплексных задачах соблюдать зависимости:

```
i18n (переводы) → Frontend (разметка) → Animation (анимации) → 3D (если нужно)
                                       ↑
                              CMS (если данные из CMS)
DevOps — параллельно / в конце для деплоя и аудита
```

### 3. Контракты между агентами
- **Frontend ↔ i18n:** Frontend использует ключи из `useTranslations(namespace)`. i18n поставляет ключи в обоих json-файлах.
- **Frontend ↔ Animation:** Frontend создаёт компонент, Animation добавляет `motion.*` обёртки или GSAP-логику.
- **Frontend ↔ 3D:** Frontend размещает `<Canvas>` контейнер, 3D заполняет сцену.
- **Frontend ↔ CMS:** CMS определяет типы контента, Frontend потребляет через Payload Local API.
- **DevOps ↔ все:** DevOps проверяет результат (build, lint, a11y) после крупных изменений.

### 4. Что ЗАПРЕЩЕНО всем агентам
- ❌ Хардкодить UI-текст — только через `useTranslations()`
- ❌ Добавлять зависимости без согласования (особенно Sanity, Vercel, i18next)
- ❌ Менять `@theme` блок в `globals.css` без причины
- ❌ Создавать `tailwind.config.ts` — Tailwind v4 CSS-first
- ❌ Использовать CSS Modules или styled-components
- ❌ Пушить напрямую без проверки `npm run build`

## Типовые сценарии

### Создание новой страницы
```
1. i18n      → добавить namespace переводов (ru.json + en.json)
2. Frontend  → создать src/app/[locale]/page-name/page.tsx
3. Frontend  → добавить ссылку в Header (если в навигации)
4. Animation → добавить enter-анимации секций
5. DevOps    → проверить build, обновить sitemap
```

### Создание нового компонента-секции
```
1. i18n      → добавить ключи переводов
2. Frontend  → создать src/components/sections/SectionName.tsx
3. Frontend  → подключить в page.tsx
4. Animation → добавить scroll-reveal / stagger анимации
5. DevOps    → проверить Lighthouse Score
```

### Интеграция контента из CMS
```
1. CMS       → определить collection/schema в Payload
2. CMS       → создать seed-данные для dev
3. Frontend  → использовать Payload Local API в server component
4. i18n      → UI-обрамление через переводы, контент из CMS
5. DevOps    → проверить build с CMS
```

### Добавление 3D-сцены
```
1. 3D        → создать компонент в src/components/three/
2. 3D        → добавить Suspense fallback и WebGL detection
3. Frontend  → разместить Canvas-контейнер на странице
4. Animation → согласовать timing с UI-анимациями
5. DevOps    → проверить performance (FPS, bundle size)
```

## Чеклист качества (для DevOps-агента после каждого крупного изменения)

- [ ] `npm run build` — без ошибок
- [ ] `npm run typecheck` — без ошибок типов
- [ ] `npm run lint` — без предупреждений
- [ ] Все страницы рендерятся в обоих локалях (`/ru/...` и `/en/...`)
- [ ] Переводы синхронизированы (одинаковые ключи в ru.json и en.json)
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] `prefers-reduced-motion` учтён для всех анимаций
- [ ] Нет хардкоженного текста в компонентах
- [ ] Изображения через `next/image` с правильными размерами

## Файловая структура (куда что класть)

```
src/
├── app/
│   ├── globals.css                    ← Design tokens (@theme)
│   ├── layout.tsx                     ← Root: metadata only
│   └── [locale]/
│       ├── layout.tsx                 ← Fonts, Providers, Header/Footer
│       ├── page.tsx                   ← Главная
│       └── {section}/page.tsx         ← Внутренние страницы
├── components/
│   ├── layout/                        ← Header, Footer
│   ├── sections/                      ← Секции страниц (HeroSection, etc.)
│   ├── ui/                            ← Кнопки, карточки, переключатели
│   └── three/                         ← 3D-компоненты (Canvas сцены)
├── i18n/                              ← Конфиг next-intl
├── lib/                               ← Утилиты (cn(), etc.)
├── messages/                          ← ru.json, en.json
└── payload/                           ← Payload CMS (collections, config)

.github/
├── agents/                            ← Файлы субагентов
├── copilot-instructions.md            ← Общие инструкции проекта
└── workflows/                         ← CI/CD (Firebase deploy)
```

## Обновление этого документа

При изменении стека, добавлении нового агента или изменении конвенций — обновлять этот файл и `copilot-instructions.md` синхронно.
