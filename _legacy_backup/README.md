# TheMarkest.me - Modern Portfolio

Новая версия личного сайта Марка Богданова, созданная с нуля на чистом HTML, CSS и JavaScript.

**🎯 Статус:** 70% готова к production | [Анализ и план улучшений →](EXECUTIVE-SUMMARY.md)

## 📊 Быстрая навигация по документации

- **[📋 Executive Summary](EXECUTIVE-SUMMARY.md)** - краткий обзор и ключевые выводы
- **[✅ TODO List](TODO-ACTIONABLE.md)** - конкретные задачи с приоритетами
- **[📈 Полный анализ](ANALYSIS-AND-IMPROVEMENTS.md)** - детальный план улучшений (17,000+ слов)
- **[📊 Сравнение версий](COMPARISON-TABLE.md)** - таблица новая vs docs vs Tilda
- **[⚙️ Setup Guide](SETUP.md)** - инструкции по запуску и развертыванию

## 🚀 Особенности

- ✅ **Чистый код**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- ✅ **SEO оптимизация**: Полные мета-теги, Schema.org, OpenGraph
- ✅ **Производительность**: Легкий и быстрый, без фреймворков
- ✅ **Адаптивность**: Mobile-first подход
- ✅ **Доступность**: WCAG 2.1 AA совместимость
- ✅ **Интернационализация**: RU/EN локализация
- ✅ **3D визуализация**: Three.js сфера навыков
- ✅ **Cyberpunk дизайн**: Неоновые эффекты, анимации

## 🔴 Критичные задачи перед деплоем

1. ❌ Добавить изображения (favicon, og-image, apple-touch-icon)
2. ❌ Настроить контактную форму (EmailJS/Formspree)
3. ❌ Подключить аналитику (Google Analytics, Yandex Metrika)
4. ❌ Добавить error handling для Three.js

**→ Подробнее в [TODO-ACTIONABLE.md](TODO-ACTIONABLE.md)**

## 📁 Структура проекта

```
themarkest.me/
├── index.html              # Главная страница
├── bio.html               # Биография и достижения
├── services.html          # Услуги
├── contacts.html          # Контакты
├── robots.txt             # SEO
├── sitemap.xml            # Карта сайта
├── site.webmanifest       # PWA манифест
│
├── css/                   # Стили
│   ├── normalize.css      # Сброс стилей
│   ├── variables.css      # CSS переменные
│   ├── base.css           # Базовые стили
│   ├── layout.css         # Структура
│   ├── components.css     # Компоненты
│   └── animations.css     # Анимации
│
├── js/                    # JavaScript модули
│   ├── utils.js           # Утилиты
│   ├── i18n.js            # Локализация
│   ├── navigation.js      # Навигация
│   ├── skills-sphere.js   # Three.js сфера
│   └── main.js            # Главный файл
│
├── data/                  # Данные
│   ├── achievements.json  # Достижения
│   ├── services.json      # Услуги
│   ├── skills.json        # Навыки для 3D
│   └── locales/           # Переводы
│       ├── ru.json
│       └── en.json
│
├── assets/               # Ресурсы
│   └── images/           # Изображения
│       ├── logo.svg
│       ├── favicon-32.png
│       └── og-image.jpg
│
└── docs/                 # Старая версия (сохранена)
```

## 🛠️ Технологии

- **HTML5**: Семантическая разметка
- **CSS3**: Grid, Flexbox, Custom Properties, Animations
- **JavaScript (ES6+)**: Модули, async/await, fetch API
- **Three.js**: 3D визуализация навыков
- **JSON**: Хранение данных

## 📦 Установка и запуск

### Локальная разработка

```bash
# Клонировать репозиторий
git clone https://github.com/TheMarkest/themarkest.me.git
cd themarkest.me

# Запустить локальный сервер (Python)
python -m http.server 8080

# Или с Node.js
npx http-server -p 8080

# Открыть в браузере
# http://localhost:8080
```

### Деплой на GitHub Pages

1. Настройте GitHub Pages в репозитории:
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `master` → `/` (root)

2. Сайт будет доступен по адресу: `https://themarkest.me`

## 📊 SEO и Аналитика

### Google Search Console
1. Подтвердите владение сайтом
2. Отправьте `sitemap.xml`
3. Проверьте индексацию страниц

## ✅ Чеклист запуска

- [x] Создана структура проекта
- [x] Настроена CSS система
- [x] Созданы все HTML страницы с SEO
- [x] Реализованы JavaScript модули
- [x] Заполнены JSON данные
- [x] Добавлена Three.js сфера навыков
- [x] Созданы robots.txt и sitemap.xml
- [ ] Добавлены реальные изображения (logo, og-image)
- [ ] Настроена Google Analytics
- [ ] Протестирована на всех устройствах
- [ ] Проверен Lighthouse (90+)

## 🤝 Контакты

- Telegram: [@themarkest](https://t.me/themarkest)
- Email: markbogdanovofficial@gmail.com
- GitHub: [@TheMarkest](https://github.com/TheMarkest)

---

**Старая версия сайта** сохранена в папке `docs/` для справки.
