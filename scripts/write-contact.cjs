const fs = require('fs');
const path = require('path');

const target = path.join('src', 'app', '[locale]', 'contact', 'page.tsx');

const content = `import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/sections/ContactForm";

const TYPE_KEYS = [
  "partnership",
  "founder",
  "bureau",
  "media",
  "product",
  "general",
] as const;
type TypeKey = (typeof TYPE_KEYS)[number];

function resolveType(raw: string | string[] | undefined): TypeKey {
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value && (TYPE_KEYS as readonly string[]).includes(value)
    ? (value as TypeKey)
    : "general";
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ type?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });
  const { type } = await searchParams;
  const initialType = resolveType(type);

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-32 md:pt-40">
        <section>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            {t("hero.lead")}
          </p>
        </section>

        <Suspense fallback={null}>
          <ContactForm initialType={initialType} />
        </Suspense>

        <section className="mt-20 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
          <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
            {t("direct.title")}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <li>
              <a
                href={\`mailto:\${t("direct.email")}\`}
                className="font-[family-name:var(--font-mono)] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
              >
                {t("direct.email")}
              </a>
            </li>
            <li>
              <a
                href={\`https://t.me/\${t("direct.telegram").replace(/^@/, "")}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-mono)] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
              >
                {t("direct.telegram")}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
`;

fs.writeFileSync(target, content, 'utf8');
console.log('wrote', target, content.split('\\n').length, 'lines');


const content = `import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "@/components/sections/ContactForm";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-32 md:pt-40">
        <section>
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[var(--color-text-secondary)]">
            {t("hero.lead")}
          </p>
        </section>

        <Suspense fallback={null}>
          <ContactForm />
        </Suspense>

        <section className="mt-20 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-6">
          <h2 className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)]">
            {t("direct.title")}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            <li>
              <a
                href={\`mailto:\${t("direct.email")}\`}
                className="font-[family-name:var(--font-mono)] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
              >
                {t("direct.email")}
              </a>
            </li>
            <li>
              <a
                href={\`https://t.me/\${t("direct.telegram").replace(/^@/, "")}\`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-mono)] text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
              >
                {t("direct.telegram")}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
`;

fs.writeFileSync(target, content, 'utf8');
console.log('wrote', target, content.split('\\n').length, 'lines');
