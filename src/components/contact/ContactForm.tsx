"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContact } from "@/lib/endpoints";
import { ApiError } from "@/lib/api";
import type { ContactField } from "@/types";

type FormState = "idle" | "loading" | "success" | "error";

const CONTACT_FIELDS: ContactField[] = [
  { key: "name", type: "text", required: true },
  { key: "email", type: "email", required: true},
  { key: "subject", type: "text", required: true},
  { key: "message", type: "textarea", required: true},
];

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const fields = CONTACT_FIELDS;

  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {}),
  );
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setError(null);

    try {
      await submitContact({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      });

      setState("success");
      setValues(fields.reduce((acc, f) => ({ ...acc, [f.key]: "" }), {}));
      setTimeout(() => setState("idle"), 4000);
    } catch (err) {
      setState("error");

      if (err instanceof ApiError) {
        if (err.isRateLimited) {
          setError(t("errors.rateLimited"));
        } else if (err.status === 400) {
          setError(t("errors.validation"));
        } else {
          setError(t("errors.generic"));
        }
      } else {
        setError(t("errors.generic"));
      }

      setTimeout(() => {
        setState("idle");
        setError(null);
      }, 6000);
    }
  };

  const getFieldClass = () =>
    "w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 disabled:opacity-60";

  const topFields = fields.filter((f) => f.type !== "textarea");
  const bottomFields = fields.filter((f) => f.type === "textarea");

  const isLoading = state === "loading";
  const isSuccess = state === "success";
  const isError = state === "error";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-surface border border-border shadow-xl overflow-hidden"
    >
      <div
        className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary-soft blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-secondary-soft blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <h2
              id="contact-form-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3"
            >
              {t("title")}{" "}
              <span className="text-gradient">{t("titleHighlight")}</span>
            </h2>
            <p className="text-base text-foreground-muted leading-relaxed">
              {t("subtitle")}
            </p>
          </div>

          <div className="hidden sm:block flex-shrink-0" aria-hidden="true">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-2xl" />
              <div className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-lg">
                <Send className="h-7 w-7" />
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
            {topFields.map((field) => (
              <FieldRenderer
                key={field.key}
                field={field}
                value={values[field.key]}
                onChange={handleChange}
                label={t(`fields.${field.key}.label`)}
                placeholder={t(`fields.${field.key}.placeholder`)}
                className={getFieldClass()}
                disabled={isLoading || isSuccess}
              />
            ))}
          </div>

          {bottomFields.map((field) => (
            <div key={field.key} className="mb-6">
              <FieldRenderer
                field={field}
                value={values[field.key]}
                onChange={handleChange}
                label={t(`fields.${field.key}.label`)}
                placeholder={t(`fields.${field.key}.placeholder`)}
                className={getFieldClass()}
                disabled={isLoading || isSuccess}
              />
            </div>
          ))}

          {isError && error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              aria-live="polite"
              className="mb-4 flex items-start gap-3 p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger"
            >
              <AlertCircle
                className="h-5 w-5 flex-shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}

          <button
            type="submit"
            disabled={isLoading || isSuccess}
            aria-label={t("submit")}
            className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
          >
            {isLoading ? (
              <>
                <span
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                  aria-hidden="true"
                />
                {t("sending")}
              </>
            ) : isSuccess ? (
              <>
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                {t("success")}
              </>
            ) : (
              <>
                {t("submit")}
                <Send
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

/* =========================================================
   Champ générique
   ========================================================= */
function FieldRenderer({
  field,
  value,
  onChange,
  label,
  placeholder,
  className,
  disabled,
}: {
  field: ContactField;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  label: string;
  placeholder: string;
  className: string;
  disabled: boolean;
}) {
  const commonProps = {
    id: field.key,
    name: field.key,
    value,
    onChange,
    placeholder,
    required: field.required,
    disabled,
    className,
    "aria-required": field.required,
  };

  return (
    <div>
      <label
        htmlFor={field.key}
        className="block text-sm font-semibold text-foreground mb-2"
      >
        {label}
        {field.required && (
          <span className="text-danger ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {field.type === "textarea" ? (
        <textarea {...commonProps} rows={field.rows ?? 5} />
      ) : (
        <input {...commonProps} type={field.type} />
      )}
    </div>
  );
}