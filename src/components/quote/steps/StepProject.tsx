"use client";

import { useTranslations } from "next-intl";
import type { QuoteField, QuoteOption } from "@/types";

interface StepProjectProps {
  fields: QuoteField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  projectTypes: QuoteOption[];
  budgets: QuoteOption[];
  timelines: QuoteOption[];
}

export default function StepProject({
  fields,
  values,
  onChange,
  projectTypes,
  budgets,
  timelines,
}: StepProjectProps) {
  const t = useTranslations("quote.fields");
  const tOpt = useTranslations("quote.options");

  const getInputClass = () =>
    "w-full px-4 py-3 rounded-xl bg-surface border border-border text-foreground placeholder:text-foreground-subtle focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200";

  const projectType = fields.find((f) => f.key === "projectType");
  const budget = fields.find((f) => f.key === "budget");
  const timeline = fields.find((f) => f.key === "timeline");
  const description = fields.find((f) => f.key === "description");

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectType && (
          <SelectField
            field={projectType}
            options={projectTypes}
            values={values}
            onChange={onChange}
            t={t}
            tOpt={tOpt}
            group="projectType"
            className={getInputClass()}
          />
        )}
        {budget && (
          <SelectField
            field={budget}
            options={budgets}
            values={values}
            onChange={onChange}
            t={t}
            tOpt={tOpt}
            group="budget"
            className={getInputClass()}
          />
        )}
      </div>

      {timeline && (
        <SelectField
          field={timeline}
          options={timelines}
          values={values}
          onChange={onChange}
          t={t}
          tOpt={tOpt}
          group="timeline"
          className={getInputClass()}
        />
      )}

      {description && (
        <div>
          <label
            htmlFor={description.key}
            className="block text-sm font-semibold text-foreground mb-1.5"
          >
            {t(`${description.key}.label`)}
            {description.required && (
              <span className="text-danger ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
          <textarea
            id={description.key}
            name={description.key}
            rows={4}
            value={values[description.key]}
            onChange={(e) => onChange(description.key, e.target.value)}
            placeholder={t(`${description.key}.placeholder`)}
            required={description.required}
            aria-required={description.required}
            className={getInputClass()}
          />
        </div>
      )}
    </div>
  );
}

function SelectField({
  field,
  options,
  values,
  onChange,
  t,
  tOpt,
  group,
  className,
}: {
  field: QuoteField;
  options: QuoteOption[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  t: ReturnType<typeof useTranslations>;
  tOpt: ReturnType<typeof useTranslations>;
  group: string;
  className: string;
}) {
  return (
    <div>
      <label
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
      <select
        id={field.key}
        name={field.key}
        value={values[field.key]}
        onChange={(e) => onChange(field.key, e.target.value)}
        required={field.required}
        aria-required={field.required}
        className={className}
      >
        <option value="">{t(`${field.key}.placeholder`)}</option>
        {options.map((opt) => (
          <option key={opt.key} value={opt.key}>
            {tOpt(`${group}.${opt.key}`)}
          </option>
        ))}
      </select>
    </div>
  );
}