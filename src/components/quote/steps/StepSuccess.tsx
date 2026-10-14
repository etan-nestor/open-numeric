"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";

interface StepSuccessProps {
  onReset: () => void;
}

export default function StepSuccess({ onReset }: StepSuccessProps) {
  const t = useTranslations("quote.success");
  const tActions = useTranslations("quote.actions");

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative rounded-3xl p-8 sm:p-12 bg-surface border border-border shadow-xl text-center overflow-hidden"
    >
      <div
        className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-success/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-primary-soft blur-3xl"
        aria-hidden="true"
      />

      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.2,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-success/15 text-success mb-6"
          aria-hidden="true"
        >
          <CheckCircle2 className="h-10 w-10" />
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
          {t("title")}
        </h2>
        <p className="text-base text-foreground-muted max-w-xl mx-auto leading-relaxed mb-8">
          {t("subtitle")}
        </p>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-primary-foreground bg-gradient-primary shadow-lg glow-primary hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
        >
          {tActions("newRequest")}
        </button>
      </div>
    </motion.div>
  );
}