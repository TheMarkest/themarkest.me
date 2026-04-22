# Firebase App Hosting — Release Strategy

## Успешная конфигурация (commit `6348c8e`, апрель 2026)

Сайт деплоится на **Firebase App Hosting** через GitHub integration (Developer Connect).  
При каждом push в `master` автоматически запускается Cloud Build.

**Live URL:** https://themarkestme--themarkestmesite.europe-west4.hosted.app

---

## Обязательные условия для успешного деплоя

### 1. Пакеты в `package.json` (dependencies)

```json
"@apphosting/adapter-nextjs": "^14.0.21",
"@swc/helpers": "0.5.21"
```

- **`@apphosting/adapter-nextjs`** — без него buildpack не определяет Next.js (exit code 51)
- **`@swc/helpers`** — Cloud Build использует npm 10.x, который строго проверяет peer deps.  
  Версия `0.5.15` не удовлетворяет требованию `>=0.5.17` → `npm ci` падает.  
  Локально (npm 11.x) эта ошибка не видна — только в Cloud Build.

### 2. `apphosting.yaml` — минимальная конфигурация

```yaml
runConfig:
  maxInstances: 1
```

**Нельзя задавать:**
- `NODE_ENV` — зарезервирована Firebase, Cloud Build падает
- `secret:` ссылки на несуществующие секреты в Secret Manager — build падает на preparer шаге

### 3. Firebase SDK — без реальных импортов

Если `firebase`/`firebase-admin` не используются реально — не устанавливать.  
Если уже добавлены но не настроены — заглушить:

```ts
// src/lib/firebase/admin.ts
export const adminApp = null;
export const adminDb = null;
```

```ts
// src/lib/firebase/client.ts
export const firebaseApp = null;
export const getAnalyticsSafe = async () => null;
```

---

## Пайплайн деплоя

```
push master
    ↓
Cloud Build (europe-west4)
    ↓
Step 0: chmod (ubuntu)          ~1s   ✅
Step 1: preparer                ~8s   ✅  читает apphosting.yaml
Step 2: pre-buildpack (shim)    ~5s   ✅  устанавливает GOOGLE_BUILDABLE
Step 3: build (CNB creator)     ~5min ✅  npm ci → next build
Step 4: publisher               ~30s  ✅  публикует образ
```

Общее время: **~10-15 минут** от push до live.

---

## Диагностика ошибок

### Как читать реальные ошибки

Cloud Build API возвращает `buildStepOutputs[3]` как **base64-encoded JSON**.  
Это единственное место где видна настоящая причина падения (не "exit 51").

```powershell
# Получить токен
$json = Get-Content "$env:USERPROFILE\.config\configstore\firebase-tools.json" | ConvertFrom-Json
$token = $json.tokens.access_token

# Список билдов
$r = Invoke-RestMethod -Uri "https://cloudbuild.googleapis.com/v1/projects/863448933101/locations/europe-west4/builds?pageSize=5" -Headers @{ Authorization = "Bearer $token" }
$r.builds | ForEach-Object { "$($_.createTime.Substring(0,19)) $($_.status) $($_.id.Substring(0,8))" }

# Детали конкретного билда
$b = Invoke-RestMethod -Uri "https://cloudbuild.googleapis.com/v1/projects/863448933101/locations/europe-west4/builds/<BUILD_ID>" -Headers @{ Authorization = "Bearer $token" }

# Декодировать реальную ошибку
$b64 = $b.results.buildStepOutputs[3]
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($b64)) | ConvertFrom-Json | Select-Object -ExpandProperty error | Select-Object errorMessage
```

### Таблица кодов ошибок

| Exit code | Где | Что означает реально |
|-----------|-----|---------------------|
| 51 | Step 3 (build) | CNB не смог выполнить `npm ci` или detect. Смотреть `buildStepOutputs[3]` |
| 1 | Step 3 (build) | Ошибка TypeScript / Next.js build |
| Preparer FAILURE | Step 1 | Невалидный `apphosting.yaml` (несуществующие секреты, зарезервированные переменные) |

### Частые ошибки и фиксы

| Симптом | Причина | Фикс |
|---------|---------|------|
| `Missing: @swc/helpers@X from lock file` | lockfile не синхронизирован | `npm install @swc/helpers@latest` + commit lockfile |
| exit 51, ~10 секунд | `@apphosting/adapter-nextjs` нет в deps | `npm install @apphosting/adapter-nextjs` |
| Preparer FAILURE | secret refs в apphosting.yaml не существуют | Убрать из yaml |
| Build OK локально, падает в облаке | npm 11 vs npm 10 peer dep strictness | Всегда проверять `npm ci --dry-run` локально |
| `Cannot find module 'firebase/...'` | firebase в deps, но модули не установлены | Stub-файлы или `npm install firebase` |

---

## Ветки и стратегия

| Ветка | Назначение |
|-------|-----------|
| `master` | Production. Auto-deploy при push. Всегда должна быть buildable. |
| `geminy-try` | Feature branch. **Нельзя деплоить напрямую** — не имеет `@apphosting/adapter-nextjs` и `@swc/helpers 0.5.21` в lockfile |
| `sirebasestudio` | Legacy. Не использовать. |

### Слияние feature branch → master

1. Убедиться что `npm run build` проходит локально
2. `npm ci --dry-run` — обязательно (эмулирует Cloud Build)
3. Проверить `apphosting.yaml` — нет `NODE_ENV`, нет несуществующих secrets
4. Merge в master → push → ждать 10-15 минут

---

## Конфигурация проекта

| Параметр | Значение |
|----------|---------|
| Firebase Project ID | `themarkestmesite` |
| Project Number | `863448933101` |
| Backend ID | `themarkestme` |
| Region | `europe-west4` |
| Tracked branch | `master` |
| Node runtime | 22 |
| Build image | `nodejs:nodejs_20260414_RC00_lightweight` |
