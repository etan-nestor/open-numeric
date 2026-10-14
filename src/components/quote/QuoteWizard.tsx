"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, ArrowRight, Send, Check, AlertCircle } from "lucide-react";
import Icon from "@/components/ui/Icon";
import { submitQuote } from "@/lib/endpoints";
import { ApiError } from "@/lib/api";
import StepContact from "./steps/StepContact";
import StepProject from "./steps/StepProject";
import StepSummary from "./steps/StepSummary";
import StepSuccess from "./steps/StepSuccess";
import type { QuoteOption, QuoteStep } from "@/types";

type WizardState = "form" | "loading" | "success" | "error";

const WIZARD_STEPS: QuoteStep[] = [
  {
    number: 1,
    key: "contact",
    icon: "User",
    fields: [
      { key: "name", type: "text", required: true },
      { key: "company", type: "text", required: false },
      { key: "email", type: "email", required: true },
      { key: "phone", type: "tel", required: false },
    ],
  },
  {
    number: 2,
    key: "project",
    icon: "Briefcase",
    fields: [
      {
        key: "projectType",
        type: "select",
        required: true,
        optionKeys: [
          "site",
          "webApp",
          "mobileApp",
          "ecommerce",
          "redesign",
          "seo",
          "design",
          "other",
        ],
      },
      {
        key: "budget",
        type: "select",
        required: true,
        optionKeys: ["less2k", "2k5k", "5k10k", "10k20k", "20k50k", "more50k"],
      },
      {
        key: "timeline",
        type: "select",
        required: true,
        optionKeys: ["less1m", "1m3m", "3m6m", "6m12m", "more12m", "undetermined"],
      },
      { key: "description", type: "textarea", required: true, rows: 5 },
    ],
  },
  {
    number: 3,
    key: "summary",
    icon: "FileText",
    fields: [{ key: "consent", type: "checkbox", required: true }],
  },
];

const PROJECT_TYPES: QuoteOption[] = [
  { key: "site" },
  { key: "webApp" },
  { key: "mobileApp" },
  { key: "ecommerce" },
  { key: "redesign" },
  { key: "seo" },
  { key: "design" },
  { key: "other" },
];

const BUDGET_RANGES: QuoteOption[] = [
  { key: "less2k" },
  { key: "2k5k" },
  { key: "5k10k" },
  { key: "10k20k" },
  { key: "20k50k" },
  { key: "more50k" },
];

const TIMELINES: QuoteOption[] = [
  { key: "less1m" },
  { key: "1m3m" },
  { key: "3m6m" },
  { key: "6m12m" },
  { key: "more12m" },
  { key: "undetermined" },
];

export default function QuoteWizard() {
  const tSteps = useTranslations("quote.steps");
  const tActions = useTranslations("quote.actions");
  const tErrors = useTranslations("quote.errors");

  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<WizardState>("form");
  const [error, setError] = useState<string | null>(null);

  const [values, setValues] = useState<Record<string, string>>({
    name: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    description: "",
    consent: "",
  });

  const updateField = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const currentStepData = WIZARD_STEPS.find((s) => s.number === currentStep);

  const canGoNext = () => {
    if (!currentStepData) return false;
    return currentStepData.fields
      .filter((f) => f.required)
      .every((f) => {
        if (f.key === "consent") return values.consent === "true";
        return values[f.key]?.trim() !== "";
      });
  };

  const handleNext = () => {
    if (canGoNext() && currentStep < WIZARD_STEPS.length) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canGoNext()) return;

    setState("loading");
    setError(null);

    try {
      await submitQuote({
        name: values.name,
        company: values.company || undefined,
        email: values.email,
        phone: values.phone || undefined,
        projectType: values.projectType,
        budget: values.budget,
        timeline: values.timeline,
        description: values.description,
      });

      setState("success");
    } catch (err) {
      setState("error");

      if (err instanceof ApiError) {
        if (err.isRateLimited) {
          setError(tErrors("rateLimited"));
        } else if (err.status === 400) {
          setError(tErrors("validation"));
        } else {
          setError(tErrors("generic"));
        }
      } else {
        setError(tErrors("generic"));
      }
    }
  };

  const handleReset = () => {
    setValues({
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      timeline: "",
      description: "",
      consent: "",
    });
    setCurrentStep(1);
    setState("form");
    setError(null);
  };

  const progress = (currentStep / WIZARD_STEPS.length) * 100;

  if (state === "success") {
    return (
      <section
        aria-labelledby="quote-success-title"
        className="relative py-12 lg:py-16"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepSuccess onReset={handleReset} />
        </div>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="quote-wizard-title"
      className="relative py-12 lg:py-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="quote-border-wrapper relative rounded-[28px] p-[2px] overflow-hidden">
          <div
            className="absolute inset-[-200%] animate-spin-slow"
            style={{
              background:
                "conic-gradient(from 0deg, var(--accent-from), var(--accent-to), var(--secondary), var(--primary), var(--accent-from))",
            }}
            aria-hidden="true"
          />

          <div className="relative rounded-[26px] bg-surface overflow-hidden">
            <div
              className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-primary-soft blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-secondary-soft blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="px-6 sm:px-8 lg:px-10 pt-6 pb-4 border-b border-border">
                <div className="relative h-1.5 rounded-full bg-border overflow-hidden mb-6">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    aria-hidden="true"
                  />
                </div>

                <ol
                  role="list"
                  className="flex justify-between"
                  aria-label="Étapes du formulaire"
                >
                  {WIZARD_STEPS.map((step) => {
                    const isActive = currentStep === step.number;
                    const isDone = currentStep > step.number;
                    return (
                      <li key={step.key} className="flex-1">
                        <button
                          type="button"
                          onClick={() =>
                            isDone && setCurrentStep(step.number)
                          }
                          disabled={!isDone}
                          aria-current={isActive ? "step" : undefined}
                          className={`group flex flex-col items-center gap-2 w-full transition-all ${
                            isDone ? "cursor-pointer" : "cursor-default"
                          }`}
                        >
                          <div
                            className={`relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full transition-all duration-300 ${
                              isDone || isActive
                                ? "bg-gradient-primary text-primary-foreground shadow-lg glow-primary scale-100"
                                : "bg-surface border border-border text-foreground-muted scale-95"
                            }`}
                            aria-hidden="true"
                          >
                            {isDone ? (
                              <Check className="h-5 w-5" />
                            ) : (
                              <Icon name={step.icon} className="h-5 w-5" />
                            )}
                          </div>
                          <span
                            className={`text-[10px] sm:text-xs font-semibold text-center transition-colors ${
                              isActive
                                ? "text-primary"
                                : isDone
                                  ? "text-foreground-muted group-hover:text-primary"
                                  : "text-foreground-subtle"
                            }`}
                          >
                            {tSteps(`labels.${step.key}`)}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">
                <div className="mb-8">
                  <h2
                    id="quote-wizard-title"
                    className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2"
                  >
                    {tSteps(`${currentStepData?.key}.title`)}
                  </h2>
                  <p className="text-sm text-foreground-muted">
                    {tSteps(`${currentStepData?.key}.subtitle`)}
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {currentStep === 1 && currentStepData && (
                        <StepContact
                          fields={currentStepData.fields}
                          values={values}
                          onChange={updateField}
                        />
                      )}
                      {currentStep === 2 && currentStepData && (
                        <StepProject
                          fields={currentStepData.fields}
                          values={values}
                          onChange={updateField}
                          projectTypes={PROJECT_TYPES}
                          budgets={BUDGET_RANGES}
                          timelines={TIMELINES}
                        />
                      )}
                      {currentStep === 3 && (
                        <StepSummary values={values} onChange={updateField} />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {state === "error" && error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      role="alert"
                      aria-live="polite"
                      className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-danger/10 border border-danger/30 text-danger"
                    >
                      <AlertCircle
                        className="h-5 w-5 flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="text-sm font-medium">{error}</p>
                    </motion.div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-10 pt-6 border-t border-border">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={handlePrev}
                        disabled={state === "loading"}
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold border border-border-strong text-foreground hover:bg-surface-hover hover:border-primary disabled:opacity-60 transition-all duration-300"
                      >
                        <ArrowLeft
                          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                          aria-hidden="true"
                        />
                        {tActions("previous")}
                      </button>
                    ) : (
                      <div />
                    )}

                    {currentStep < WIZARD_STEPS.length ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!canGoNext()}
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
                      >
                        {tActions("next")}
                        <ArrowRight
                          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={state === "loading" || !canGoNext()}
                        className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        {state === "loading" ? (
                          <>
                            <span
                              className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"
                              aria-hidden="true"
                            />
                            {tActions("sending")}
                          </>
                        ) : (
                          <>
                            {tActions("submit")}
                            <Send
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5"
                              aria-hidden="true"
                            />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}