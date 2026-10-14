"use client";

import { useTranslations } from "next-intl";
import type { QuoteField } from "@/types";

interface StepContactProps {
  fields: QuoteField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function StepContact({
  fields,
  values,
  onChange,
}: StepContactProps) {
  const t = useTranslations("quote.fields");

  const getInputClass = () =>
    "w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {fields.map((field) => {
        const labelId = `${field.key}-label`;
        return (
          <div key={field.key}>
            <label
              id={labelId}
              htmlFor={field.key}
              className="block text-sm font-semibold text-foreground mb-1.5"
            >
              {t(`${field.key}.label`)}
              {field.required && (
                <span className="text-danger ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </label>
            <input
              id={field.key}
              name={field.key}
              type={field.type}
              value={values[field.key]}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={t(`${field.key}.placeholder`)}
              required={field.required}
              aria-required={field.required}
              aria-labelledby={labelId}
              autoComplete={
                field.key === "name"
                  ? "name"
                  : field.key === "email"
                    ? "email"
                    : field.key === "phone"
                      ? "tel"
                      : field.key === "company"
                        ? "organization"
                        : "off"
              }
              className={getInputClass()}
            />
          </div>
        );
      })}
    </div>
  );
}