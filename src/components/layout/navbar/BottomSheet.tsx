"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function BottomSheet({
  open,
  onClose,
  title,
  children,
}: BottomSheetProps) {
  // Bloque le scroll du body quand ouvert
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Ferme avec Échap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm lg:hidden"
            aria-hidden
          />

          {/* PANNEAU */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[101] lg:hidden rounded-t-3xl bg-dropdown-bg border-t border-dropdown-border max-h-[85vh] flex flex-col"
            style={{ boxShadow: "var(--dropdown-shadow)" }}
            role="dialog"
            aria-modal="true"
          >
            {/* Poignée */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="h-1.5 w-12 rounded-full bg-border-strong" />
            </div>

            {/* Header */}
            {title && (
              <div className="flex items-center justify-between px-5 py-3 border-b border-border shrink-0">
                <h2 className="text-base font-bold text-foreground">{title}</h2>
                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="p-1.5 rounded-lg text-foreground-muted hover:bg-surface-hover transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Contenu scrollable */}
            <div className="overflow-y-auto overscroll-contain p-4">
              {children}
            </div>

            {/* Safe area iOS */}
            <div className="h-[env(safe-area-inset-bottom)] shrink-0" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}