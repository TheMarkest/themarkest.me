const { chromium } = require('playwright');
const fs = require('fs');

async function analyzeSite() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  
  const report = {
    timestamp: new Date().toISOString(),
    versions: {}
  };

  // Анализ новой версии (localhost:8080)
  console.log('\n=== Анализируем НОВУЮ версию (localhost:8080) ===\n');
  report.versions.new = await analyzeVersion(context, 'http://localhost:8080', 'Новая версия');

  // Анализ старой HTML версии (localhost:8080/docs)
  console.log('\n=== Анализируем СТАРУЮ HTML версию (localhost:8080/docs) ===\n');
  report.versions.docsHtml = await analyzeVersion(context, 'http://localhost:8080/docs', 'Старая HTML версия');

  // Анализ Tilda версии
  console.log('\n=== Анализируем TILDA версию (themarkest.tilda.ws) ===\n');
  report.versions.tilda = await analyzeVersion(context, 'https://themarkest.tilda.ws', 'Tilda версия');

  await browser.close();

  // Сохраняем отчет
  fs.writeFileSync('site-analysis-report.json', JSON.stringify(report, null, 2), 'utf8');
  
  // Генерируем читаемый отчет
  generateReadableReport(report);
  
  console.log('\n✅ Анализ завершен! Отчеты сохранены в:');
  console.log('  - site-analysis-report.json (детальный JSON)');
  console.log('  - site-analysis-report.txt (читаемый текст)');
}

async function analyzeVersion(context, url, name) {
  const page = await context.newPage();
  const analysis = {
    name,
    url,
    pages: {},
    issues: [],
    recommendations: []
  };

  try {
    // Анализируем главную страницу
    console.log(`📄 Анализ главной: ${url}`);
    analysis.pages.home = await analyzePage(page, url, 'home');

    // Определяем структуру навигации
    const links = await page.$$eval('a[href]', anchors => 
      anchors.map(a => ({
        text: a.textContent.trim(),
        href: a.getAttribute('href')
      })).filter(l => l.href && !l.href.startsWith('#') && !l.href.startsWith('http'))
    );

    // Пробуем найти другие страницы
    const pagesToCheck = [
      { path: '/bio.html', key: 'bio' },
      { path: '/services.html', key: 'services' },
      { path: '/contacts.html', key: 'contacts' },
      { path: '/index.html', key: 'index' }
    ];

    for (const pageInfo of pagesToCheck) {
      try {
        const pageUrl = url + pageInfo.path;
        console.log(`📄 Анализ страницы: ${pageUrl}`);
        const pageAnalysis = await analyzePage(page, pageUrl, pageInfo.key);
        if (pageAnalysis.accessible) {
          analysis.pages[pageInfo.key] = pageAnalysis;
        }
      } catch (e) {
        console.log(`   ⚠️  Страница недоступна: ${pageInfo.path}`);
      }
    }

  } catch (error) {
    analysis.error = error.message;
    console.error(`❌ Ошибка при анализе ${name}: ${error.message}`);
  }

  await page.close();
  return analysis;
}

async function analyzePage(page, url, pageName) {
  const result = {
    accessible: false,
    loadTime: 0,
    seo: {},
    content: {},
    design: {},
    technical: {},
    screenshots: {}
  };

  try {
    const startTime = Date.now();
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    result.loadTime = Date.now() - startTime;
    result.accessible = response.ok();
    result.httpStatus = response.status();

    if (!response.ok()) {
      return result;
    }

    // SEO анализ
    result.seo = {
      title: await page.title(),
      description: await page.$eval('meta[name="description"]', el => el.content).catch(() => 'Отсутствует'),
      ogTitle: await page.$eval('meta[property="og:title"]', el => el.content).catch(() => 'Отсутствует'),
      ogImage: await page.$eval('meta[property="og:image"]', el => el.content).catch(() => 'Отсутствует'),
      canonical: await page.$eval('link[rel="canonical"]', el => el.href).catch(() => 'Отсутствует'),
      h1Count: await page.$$eval('h1', els => els.length),
      h1Text: await page.$eval('h1', el => el.textContent.trim()).catch(() => 'Отсутствует')
    };

    // Контент
    result.content = {
      wordCount: await page.evaluate(() => document.body.innerText.split(/\s+/).length),
      imageCount: await page.$$eval('img', imgs => imgs.length),
      linkCount: await page.$$eval('a', links => links.length),
      hasVideo: await page.$('video') !== null || await page.$('iframe[src*="youtube"]') !== null,
      sections: await page.$$eval('[class*="section"], section, main > div', sections => sections.length)
    };

    // Дизайн и UI
    result.design = {
      hasMobileMenu: await page.$('[class*="burger"], [class*="hamburger"], [class*="mobile-menu"]') !== null,
      hasLanguageSwitcher: await page.$('[class*="lang"], [data-lang]') !== null,
      colorScheme: await page.evaluate(() => {
        const styles = getComputedStyle(document.body);
        return {
          background: styles.backgroundColor,
          color: styles.color,
          fontFamily: styles.fontFamily
        };
      }),
      animations: await page.$$eval('[class*="animate"], [class*="fade"], [class*="slide"]', els => els.length)
    };

    // Технический анализ
    result.technical = {
      hasThreeJS: await page.evaluate(() => typeof THREE !== 'undefined'),
      hasCanvas: await page.$('canvas') !== null,
      jsErrors: [],
      consoleWarnings: [],
      resourceCount: await page.evaluate(() => performance.getEntriesByType('resource').length),
      domSize: await page.evaluate(() => document.getElementsByTagName('*').length)
    };

    // Слушаем ошибки консоли
    page.on('console', msg => {
      if (msg.type() === 'error') result.technical.jsErrors.push(msg.text());
      if (msg.type() === 'warning') result.technical.consoleWarnings.push(msg.text());
    });

    // Скриншоты
    const screenshotName = `screenshot-${pageName}-${Date.now()}`;
    await page.screenshot({ 
      path: `${screenshotName}-desktop.png`, 
      fullPage: true 
    });
    result.screenshots.desktop = `${screenshotName}-desktop.png`;

    // Мобильная версия
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: `${screenshotName}-mobile.png`, 
      fullPage: true 
    });
    result.screenshots.mobile = `${screenshotName}-mobile.png`;

    // Возвращаем viewport обратно
    await page.setViewportSize({ width: 1920, height: 1080 });

    console.log(`   ✅ Загружено за ${result.loadTime}ms`);
    console.log(`   📊 SEO: title="${result.seo.title}", h1="${result.seo.h1Text}"`);
    console.log(`   📝 Контент: ${result.content.wordCount} слов, ${result.content.imageCount} изображений`);
    console.log(`   🎨 Дизайн: ${result.design.animations} анимаций, Three.js: ${result.technical.hasThreeJS ? 'Да' : 'Нет'}`);

  } catch (error) {
    result.error = error.message;
    console.error(`   ❌ Ошибка: ${error.message}`);
  }

  return result;
}

function generateReadableReport(report) {
  let text = `
╔════════════════════════════════════════════════════════════════════════════╗
║                     АНАЛИЗ ВЕРСИЙ САЙТА THEMARKEST.ME                      ║
║                        ${report.timestamp}                         ║
╚════════════════════════════════════════════════════════════════════════════╝

`;

  const versions = ['new', 'docsHtml', 'tilda'];
  const versionNames = {
    new: 'НОВАЯ ВЕРСИЯ (localhost:8080)',
    docsHtml: 'СТАРАЯ HTML ВЕРСИЯ (docs/)',
    tilda: 'TILDA ВЕРСИЯ (themarkest.tilda.ws)'
  };

  versions.forEach(versionKey => {
    const version = report.versions[versionKey];
    if (!version) return;

    text += `\n${'='.repeat(80)}\n`;
    text += `  ${versionNames[versionKey]}\n`;
    text += `${'='.repeat(80)}\n\n`;

    if (version.error) {
      text += `❌ ОШИБКА: ${version.error}\n\n`;
      return;
    }

    Object.entries(version.pages).forEach(([pageName, page]) => {
      if (!page.accessible) {
        text += `📄 ${pageName.toUpperCase()}: Недоступна (HTTP ${page.httpStatus})\n`;
        return;
      }

      text += `\n📄 ${pageName.toUpperCase()}\n`;
      text += `${'─'.repeat(80)}\n`;
      text += `⏱️  Скорость загрузки: ${page.loadTime}ms\n`;
      text += `📊 HTTP статус: ${page.httpStatus}\n\n`;

      text += `SEO:\n`;
      text += `  • Title: ${page.seo.title}\n`;
      text += `  • Description: ${page.seo.description}\n`;
      text += `  • H1: ${page.seo.h1Text} (количество: ${page.seo.h1Count})\n`;
      text += `  • OG:Title: ${page.seo.ogTitle}\n`;
      text += `  • OG:Image: ${page.seo.ogImage}\n`;
      text += `  • Canonical: ${page.seo.canonical}\n\n`;

      text += `Контент:\n`;
      text += `  • Слов: ${page.content.wordCount}\n`;
      text += `  • Изображений: ${page.content.imageCount}\n`;
      text += `  • Ссылок: ${page.content.linkCount}\n`;
      text += `  • Видео: ${page.content.hasVideo ? 'Да' : 'Нет'}\n`;
      text += `  • Секций: ${page.content.sections}\n\n`;

      text += `Дизайн и UI:\n`;
      text += `  • Мобильное меню: ${page.design.hasMobileMenu ? 'Да' : 'Нет'}\n`;
      text += `  • Переключатель языка: ${page.design.hasLanguageSwitcher ? 'Да' : 'Нет'}\n`;
      text += `  • Анимации: ${page.design.animations}\n`;
      text += `  • Цветовая схема:\n`;
      text += `    - Фон: ${page.design.colorScheme.background}\n`;
      text += `    - Текст: ${page.design.colorScheme.color}\n`;
      text += `    - Шрифт: ${page.design.colorScheme.fontFamily}\n\n`;

      text += `Технические характеристики:\n`;
      text += `  • Three.js: ${page.technical.hasThreeJS ? 'Да ✅' : 'Нет'}\n`;
      text += `  • Canvas: ${page.technical.hasCanvas ? 'Да' : 'Нет'}\n`;
      text += `  • Размер DOM: ${page.technical.domSize} элементов\n`;
      text += `  • Загруженных ресурсов: ${page.technical.resourceCount}\n`;
      text += `  • JS ошибки: ${page.technical.jsErrors.length}\n`;
      text += `  • Предупреждения: ${page.technical.consoleWarnings.length}\n\n`;

      if (page.screenshots.desktop) {
        text += `📸 Скриншоты:\n`;
        text += `  • Desktop: ${page.screenshots.desktop}\n`;
        text += `  • Mobile: ${page.screenshots.mobile}\n\n`;
      }
    });
  });

  // Сравнительный анализ
  text += `\n${'='.repeat(80)}\n`;
  text += `  СРАВНИТЕЛЬНЫЙ АНАЛИЗ И РЕКОМЕНДАЦИИ\n`;
  text += `${'='.repeat(80)}\n\n`;

  text += generateComparison(report.versions);

  fs.writeFileSync('site-analysis-report.txt', text, 'utf8');
}

function generateComparison(versions) {
  let comparison = '';

  // Сравниваем скорость загрузки
  comparison += `📊 СКОРОСТЬ ЗАГРУЗКИ ГЛАВНОЙ СТРАНИЦЫ:\n`;
  if (versions.new?.pages?.home) {
    comparison += `  • Новая версия: ${versions.new.pages.home.loadTime}ms\n`;
  }
  if (versions.docsHtml?.pages?.home) {
    comparison += `  • Старая HTML: ${versions.docsHtml.pages.home.loadTime}ms\n`;
  }
  if (versions.tilda?.pages?.home) {
    comparison += `  • Tilda: ${versions.tilda.pages.home.loadTime}ms\n`;
  }
  comparison += '\n';

  // SEO сравнение
  comparison += `🔍 SEO ОПТИМИЗАЦИЯ:\n`;
  Object.entries(versions).forEach(([key, version]) => {
    if (version.pages?.home) {
      const seo = version.pages.home.seo;
      comparison += `  • ${key}: H1 (${seo.h1Count}), Description: ${seo.description !== 'Отсутствует' ? '✅' : '❌'}\n`;
    }
  });
  comparison += '\n';

  // Технологии
  comparison += `⚙️ ТЕХНОЛОГИИ:\n`;
  Object.entries(versions).forEach(([key, version]) => {
    if (version.pages?.home) {
      const tech = version.pages.home.technical;
      comparison += `  • ${key}: Three.js ${tech.hasThreeJS ? '✅' : '❌'}, DOM: ${tech.domSize} элементов\n`;
    }
  });
  comparison += '\n';

  // Рекомендации
  comparison += `💡 РЕКОМЕНДАЦИИ ПО УЛУЧШЕНИЮ:\n\n`;
  comparison += generateRecommendations(versions);

  return comparison;
}

function generateRecommendations(versions) {
  let recommendations = '';
  const newVersion = versions.new?.pages?.home;

  if (!newVersion) {
    return 'Не удалось проанализировать новую версию\n';
  }

  // Проверяем различные аспекты
  const checks = [];

  if (newVersion.loadTime > 3000) {
    checks.push({
      priority: 'ВЫСОКИЙ',
      category: 'Производительность',
      issue: `Медленная загрузка (${newVersion.loadTime}ms)`,
      solution: 'Оптимизировать изображения, минифицировать CSS/JS, использовать CDN'
    });
  }

  if (newVersion.seo.description === 'Отсутствует') {
    checks.push({
      priority: 'ВЫСОКИЙ',
      category: 'SEO',
      issue: 'Отсутствует meta description',
      solution: 'Добавить уникальное описание для каждой страницы'
    });
  }

  if (newVersion.seo.h1Count !== 1) {
    checks.push({
      priority: 'СРЕДНИЙ',
      category: 'SEO',
      issue: `Некорректное количество H1 (${newVersion.seo.h1Count})`,
      solution: 'Должен быть ровно один H1 на странице'
    });
  }

  if (newVersion.seo.ogImage === 'Отсутствует') {
    checks.push({
      priority: 'СРЕДНИЙ',
      category: 'SEO',
      issue: 'Отсутствует OG:Image',
      solution: 'Добавить изображение для превью в социальных сетях (1200x630px)'
    });
  }

  if (!newVersion.design.hasMobileMenu) {
    checks.push({
      priority: 'ВЫСОКИЙ',
      category: 'UX',
      issue: 'Не найдено мобильное меню',
      solution: 'Добавить бургер-меню для мобильных устройств'
    });
  }

  if (!newVersion.design.hasLanguageSwitcher) {
    checks.push({
      priority: 'СРЕДНИЙ',
      category: 'UX',
      issue: 'Не найден переключатель языка',
      solution: 'Сделать переключатель языка более заметным'
    });
  }

  if (newVersion.technical.jsErrors.length > 0) {
    checks.push({
      priority: 'КРИТИЧНЫЙ',
      category: 'Технические',
      issue: `Обнаружены JS ошибки (${newVersion.technical.jsErrors.length})`,
      solution: 'Исправить все JavaScript ошибки в консоли'
    });
  }

  if (newVersion.content.imageCount === 0) {
    checks.push({
      priority: 'СРЕДНИЙ',
      category: 'Контент',
      issue: 'Нет изображений на странице',
      solution: 'Добавить визуальный контент, фотографии, иллюстрации'
    });
  }

  if (newVersion.technical.domSize > 1500) {
    checks.push({
      priority: 'НИЗКИЙ',
      category: 'Производительность',
      issue: `Большой размер DOM (${newVersion.technical.domSize} элементов)`,
      solution: 'Упростить структуру HTML, удалить избыточные элементы'
    });
  }

  // Сортируем по приоритету
  const priorityOrder = { 'КРИТИЧНЫЙ': 0, 'ВЫСОКИЙ': 1, 'СРЕДНИЙ': 2, 'НИЗКИЙ': 3 };
  checks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Форматируем вывод
  let counter = 1;
  checks.forEach(check => {
    const emoji = {
      'КРИТИЧНЫЙ': '🔴',
      'ВЫСОКИЙ': '🟠',
      'СРЕДНИЙ': '🟡',
      'НИЗКИЙ': '🟢'
    }[check.priority];

    recommendations += `${counter}. ${emoji} [${check.priority}] ${check.category}\n`;
    recommendations += `   Проблема: ${check.issue}\n`;
    recommendations += `   Решение: ${check.solution}\n\n`;
    counter++;
  });

  if (checks.length === 0) {
    recommendations += '✅ Критичных проблем не обнаружено!\n\n';
  }

  return recommendations;
}

// Запуск анализа
analyzeSite().catch(console.error);
