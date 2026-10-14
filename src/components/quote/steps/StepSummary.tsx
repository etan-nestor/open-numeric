"use client";

import { useTranslations } from "next-intl";
import { FileText } from "lucide-react";

interface StepSummaryProps {
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export default function StepSummary({ values, onChange }: StepSummaryProps) {
  const t = useTranslations("quote.summary");
  const tFields = useTranslations("quote.fields");
  const tOpt = useTranslations("quote.options");

  const rows: { label: string; value: string }[] = [
    { label: t("name"), value: values.name || t("empty") },
    { label: t("company"), value: values.company || t("empty") },
    { label: t("email"), value: values.email || t("empty") },
    { label: t("phone"), value: values.phone || t("empty") },
    {
      label: t("projectType"),
      value: values.projectType
        ? tOpt(`projectType.${values.projectType}`)
        : t("empty"),
    },
    {
      label: t("budget"),
      value: values.budget ? tOpt(`budget.${values.budget}`) : t("empty"),
    },
    {
      label: t("timeline"),
      value: values.timeline ? tOpt(`timeline.${values.timeline}`) : t("empty"),
    },
    { label: t("description"), value: values.description || t("empty") },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl p-6 bg-primary-soft border border-primary/20">
        <div className="flex items-center gap-3 mb-5">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-md"
            aria-hidden="true"
          >
            <FileText className="h-5 w-5" />
          </div>
          <h3 className="text-base font-bold text-foreground">
            {t("title")}
          </h3>
        </div>

        <dl className="space-y-3">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-2.5 border-b border-border/40 last:border-0"
            >
              <dt className="text-sm text-foreground-muted">{row.label}</dt>
              <dd className="text-sm font-medium text-foreground sm:text-right sm:max-w-md break-words">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <label
        htmlFor="consent"
        className="flex items-start gap-3 cursor-pointer group"
      >
        <input
          id="consent"
          type="checkbox"
          checked={values.consent === "true"}
          onChange={(e) => onChange("consent", e.target.checked ? "true" : "")}
          required
          aria-required="true"
          className="mt-1 h-5 w-5 rounded border-border-strong text-primary focus:ring-2 focus:ring-primary/40 cursor-pointer"
        />
        <span className="text-sm text-foreground-muted leading-relaxed group-hover:text-foreground transition-colors">
          {tFields("consent.label")}
        </span>
      </label>
    </div>
  );
}