"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Mail, Send } from "lucide-react";
import { ZodError } from "zod";
import { cn } from "@/lib/utils";
import {
  contactSchema,
  contactTypeEnum,
  type ContactInput,
} from "@/lib/validators/contact";

type Status = "idle" | "submitting" | "success" | "error";

const TYPE_OPTIONS = contactTypeEnum.options;

const initialFormData: ContactInput = {
  type: "partnership",
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function ContactPage() {
  const t = useTranslations("contactPage");

  const [formData, setFormData] = useState<ContactInput>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");

  const mapZodErrors = (error: ZodError): Record<string, string> => {
    const out: Record<string, string> = {};
    for (const issue of error.issues) {
      const field = issue.path[0];
      if (typeof field !== "string") continue;
      if (out[field]) continue;
      if (field === "name") out.name = t("form.errors.name");
      else if (field === "email") out.email = t("form.errors.email");
      else if (field === "message") out.message = t("form.errors.message");
      else if (field === "type") out.type = t("form.errors.type");
    }
    return out;
  };

  const handleChange = <K extends keyof ContactInput>(
    field: K,
    value: ContactInput[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const parsed = contactSchema.safeParse(formData);
    if (!parsed.success) {
      setErrors(mapZodErrors(parsed.error));
      setStatus("error");
      return;
    }

    setErrors({});

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setFormData(initialFormData);
    } catch {
      setStatus("error");
    }
  };

  const labelClass =
    "block font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-text-secondary)] mb-2";
  const inputClass =
    "w-full bg-[var(--color-bg-elevated)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-3 text-[var(--color-text)] focus:border-[var(--color-accent)] focus:outline-none transition";
  const errorClass = "text-[var(--color-signal)] text-sm mt-2";

  return (
    <main className="min-h-screen pt-32 md:pt-40 pb-24">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        {/* Hero */}
        <header className="space-y-4">
          <span className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest text-[var(--color-accent)]">
            {t("hero.eyebrow")}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl">
            {t("hero.lead")}
          </p>
        </header>

        {/* Two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-2 space-y-6"
          >
            {/* Type */}
            <div>
              <label className={labelClass}>{t("form.type.label")}</label>
              <div
                role="radiogroup"
                aria-label={t("form.type.label")}
                className="flex flex-wrap gap-2"
              >
                {TYPE_OPTIONS.map((opt) => {
                  const active = formData.type === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      role="radio"
                      aria-checked={active}
                      onClick={() => handleChange("type", opt)}
                      className={cn(
                        "font-[family-name:var(--font-mono)] text-xs uppercase tracking-widest px-4 py-2 rounded-[var(--radius-sm)] border transition",
                        active
                          ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-dim)]"
                          : "border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] hover:text-[var(--color-text)]"
                      )}
                    >
                      {t(`form.type.options.${opt}`)}
                    </button>
                  );
                })}
              </div>
              {errors.type && <p className={errorClass}>{errors.type}</p>}
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className={labelClass}>
                {t("form.name.label")}
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder={t("form.name.placeholder")}
                className={inputClass}
                aria-invalid={!!errors.name}
              />
              {errors.name && <p className={errorClass}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                {t("form.email.label")}
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder={t("form.email.placeholder")}
                className={inputClass}
                aria-invalid={!!errors.email}
              />
              {errors.email && <p className={errorClass}>{errors.email}</p>}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className={labelClass}>
                {t("form.company.label")}
              </label>
              <input
                id="company"
                type="text"
                value={formData.company ?? ""}
                onChange={(e) => handleChange("company", e.target.value)}
                placeholder={t("form.company.placeholder")}
                className={inputClass}
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClass}>
                {t("form.message.label")}
              </label>
              <textarea
                id="message"
                rows={6}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder={t("form.message.placeholder")}
                className={cn(inputClass, "resize-y")}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className={errorClass}>{errors.message}</p>
              )}
            </div>

            {/* Banner */}
            {status === "success" && (
              <div
                role="status"
                className="border border-[var(--color-accent)] bg-[var(--color-accent-dim)] text-[var(--color-accent)] rounded-[var(--radius-md)] px-4 py-3 text-sm"
              >
                {t("form.success")}
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="border border-[var(--color-signal)] bg-[var(--color-signal-dim)] text-[var(--color-signal)] rounded-[var(--radius-md)] px-4 py-3 text-sm"
              >
                {t("form.error")}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-bg)] font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest px-6 py-3 rounded-[var(--radius-md)] hover:bg-[var(--color-accent-hover)] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4" aria-hidden />
              {status === "submitting" ? t("form.submitting") : t("form.submit")}
            </button>
          </form>

          {/* Direct channels */}
          <aside className="lg:col-span-1">
            <div className="border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-bg-elevated)] p-6 space-y-5">
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold">
                {t("direct.title")}
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail
                    className="h-5 w-5 mt-0.5 text-[var(--color-accent)]"
                    aria-hidden
                  />
                  <a
                    href={`mailto:${t("direct.email")}`}
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition break-all"
                  >
                    {t("direct.email")}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Send
                    className="h-5 w-5 mt-0.5 text-[var(--color-accent)]"
                    aria-hidden
                  />
                  <a
                    href="https://t.me/themarkest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition"
                  >
                    {t("direct.telegram")}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
