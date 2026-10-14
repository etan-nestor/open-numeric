"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Icon from "@/components/ui/Icon";
import type { QuoteStep } from "@/types";

interface QuoteProgressProps {
  steps: QuoteStep[];
  currentStep: number;
}

export default function QuoteProgress({ steps, currentStep }: QuoteProgressProps) {
  const t = useTranslations("quote.steps.labels");
  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div
        className="relative h-1.5 rounded-full bg-border overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-valuenow={currentStep}
        aria-label="Progression du formulaire"
      >
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          aria-hidden="true"
        />
      </div>

      <ol role="list" className="flex justify-between mt-5">
        {steps.map((step) => {
          const isActive = currentStep === step.number;
          const isDone = currentStep > step.number;
          return (
            <li
              key={step.key}
              className="flex flex-col items-center gap-2 flex-1"
              aria-current={isActive ? "step" : undefined}
            >
              <div
                className={`relative flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 ${
                  isDone || isActive
                    ? "bg-gradient-primary text-primary-foreground shadow-lg glow-primary"
                    : "bg-surface border border-border text-foreground-muted"
                }`}
                aria-hidden="true"
              >
                {isDone ? (
                  <Icon name="Check" className="h-5 w-5" />
                ) : (
                  <Icon name={step.icon} className="h-5 w-5" />
                )}
              </div>
              <span
                className={`text-xs font-semibold text-center transition-colors ${
                  isActive ? "text-primary" : "text-foreground-subtle"
                }`}
              >
                {t(step.key)}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}