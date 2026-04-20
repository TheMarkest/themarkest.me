"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

const TYPE_KEYS = [
  "partnership",
  "founder",
  "bureau",
  "media",
  "product",
  "general",
] as const;

type TypeKey = (typeof TYPE_KEYS)[number];

function isTypeKey(value: string | null): value is TypeKey {
  return !!value && (TYPE_KEYS as readonly string[]).includes(value);
}

type FieldErrors = Partial<Record<"type" | "name" | "email" | "company" | "message", string[]>>;
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("contactPage.form");
  const searchParams = useSearchParams();

  const initialType = useMemo<TypeKey>(() => {
    const param = searchParams.get("type");
    return isTypeKey(param) ? param : "general";
  }, [searchParams]);

  const [type, setType] = useState<TypeKey>(initialType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  // Keep select in sync if user clicks another CTA chip while on the page.
  useEffect(() => {
    const param = searchParams.get("type");
    if (isTypeKey(param)) {
      setType(param);
    }
  }, [searchParams]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, name, email, company, message }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        errors?: FieldErrors;
      };

      if (!res.ok || !data.ok) {
        setErrors(data.errors ?? {});
        setStatus("error");
        return;
      }

      setStatus("success");
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] transition-colors duration-[var(--duration-normal)] focus:border-[var(--color-accent)] focus:outline-none";
  const labelClass =
    "block font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)]";
  const errorClass = "mt-1 text-sm text-[var(--color-signal)]";

  return (
    <form onSubmit={handleSubmit} className="mt-12 space-y-6" noValidate>
      <fieldset>
        <legend className={labelClass}>{t("type.label")}</legend>
        <div
          role="radiogroup"
          aria-label={t("type.label")}
          className="mt-2 flex flex-wrap gap-2"
        >
          {TYPE_KEYS.map((key) => {
            const active = type === key;
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setType(key)}
                className={
                  active
                    ? "rounded-[var(--radius-md)] border border-[var(--color-accent)] bg-[var(--color-accent-dim)] px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)] transition"
                    : "rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-bg-elevated)] px-4 py-2 font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                }
              >
                {t(`type.options.${key}`)}
              </button>
            );
          })}
        </div>
        <input type="hidden" name="type" value={type} />
        {errors.type?.[0] && <p className={errorClass}>{t("errors.type")}</p>}
      </fieldset>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            {t("name.label")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name.placeholder")}
            autoComplete="name"
            required
            className={`${inputClass} mt-2`}
          />
          {errors.name?.[0] && <p className={errorClass}>{t("errors.name")}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            {t("email.label")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email.placeholder")}
            autoComplete="email"
            required
            className={`${inputClass} mt-2`}
          />
          {errors.email?.[0] && <p className={errorClass}>{t("errors.email")}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className={labelClass}>
          {t("company.label")}
        </label>
        <input
          id="contact-company"
          name="company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={t("company.placeholder")}
          autoComplete="organization"
          className={`${inputClass} mt-2`}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {t("message.label")}
        </label>
        <textarea
          id="contact-message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("message.placeholder")}
          rows={6}
          required
          className={`${inputClass} mt-2 resize-y`}
        />
        {errors.message?.[0] && <p className={errorClass}>{t("errors.message")}</p>}
      </div>

      <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-accent)] px-6 py-3 font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-bg)] transition hover:bg-[var(--color-accent-hover)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? t("submitting") : t("submit")}
          <span aria-hidden>→</span>
        </button>
        <p
          role="status"
          aria-live="polite"
          className={
            status === "success"
              ? "text-sm text-[var(--color-accent)]"
              : status === "error"
                ? "text-sm text-[var(--color-signal)]"
                : "text-sm text-[var(--color-text-muted)]"
          }
        >
          {status === "success" && t("success")}
          {status === "error" && t("error")}
        </p>
      </div>
    </form>
  );
}
