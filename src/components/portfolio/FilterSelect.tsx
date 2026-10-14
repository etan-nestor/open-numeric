"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Check } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

interface FilterSelectProps {
  label: string;
  icon?: React.ReactNode;
  options: FilterOption[];
  selected: string[];
  onToggle: (value: string) => void;
  onClear: () => void;
}

export default function FilterSelect({
  label,
  icon,
  options,
  selected,
  onToggle,
  onClear,
}: FilterSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const hasSelection = selected.length > 0;

  return (
    <div className="relative" ref={ref}>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen((v) => !v);
          }
        }}
        className={`group/select flex items-stretch rounded-xl border bg-surface transition-all duration-200 min-h-[44px] cursor-pointer ${
          open
            ? "border-primary ring-2 ring-primary/20"
            : hasSelection
              ? "border-primary/50"
              : "border-border hover:border-primary/40"
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <div className="flex-1 flex items-center gap-2 pl-3.5 pr-2 py-2 text-left min-w-0">
          {icon && (
            <span
              className="flex-shrink-0 text-foreground-subtle"
              aria-hidden="true"
            >
              {icon}
            </span>
          )}

          {hasSelection ? (
            <div className="flex-1 flex flex-wrap items-center gap-1 min-w-0">
              {selected.slice(0, 2).map((value) => {
                const opt = options.find((o) => o.value === value);
                return (
                  <span
                    key={value}
                    className="inline-flex items-center gap-1 max-w-full pl-2 pr-1 py-0.5 rounded-md bg-gradient-primary text-primary-foreground text-[11px] font-semibold"
                  >
                    <span className="truncate max-w-[100px]">
                      {opt?.label ?? value}
                    </span>
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          onToggle(value);
                        }
                      }}
                      className="flex-shrink-0 rounded-full p-0.5 hover:bg-white/20 transition-colors cursor-pointer"
                      aria-label={`Retirer ${opt?.label ?? value}`}
                    >
                      <X className="h-2.5 w-2.5" aria-hidden="true" />
                    </span>
                  </span>
                );
              })}
              {selected.length > 2 && (
                <span className="text-[11px] font-semibold text-foreground-muted px-1">
                  +{selected.length - 2}
                </span>
              )}
            </div>
          ) : (
            <span className="flex-1 text-sm text-foreground-muted truncate">
              {label}
            </span>
          )}
        </div>

        {hasSelection ? (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.stopPropagation();
                onClear();
              }
            }}
            className="flex-shrink-0 flex items-center px-2 text-foreground-subtle hover:text-danger transition-colors cursor-pointer"
            aria-label={`Effacer ${label}`}
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        ) : (
          <span className="flex-shrink-0 flex items-center px-2 text-foreground-subtle">
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              aria-hidden="true"
            />
          </span>
        )}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 right-0 top-full mt-2 min-w-[220px] rounded-2xl bg-dropdown-bg border border-dropdown-border overflow-hidden z-50"
            style={{ boxShadow: "var(--dropdown-shadow)" }}
            role="listbox"
          >
            {hasSelection && (
              <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                <span className="text-[10px] uppercase tracking-wider font-bold text-foreground-subtle">
                  {label}
                </span>
                <button
                  type="button"
                  onClick={onClear}
                  className="text-[11px] font-semibold text-foreground-muted hover:text-danger transition-colors"
                >
                  Effacer
                </button>
              </div>
            )}

            <div className="max-h-[260px] overflow-y-auto p-1.5">
              {options.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onToggle(opt.value)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                      isSelected
                        ? "bg-primary-soft text-primary font-semibold"
                        : "text-foreground-muted hover:bg-surface-hover hover:text-foreground"
                    }`}
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span
                      className={`flex-shrink-0 inline-flex h-4 w-4 items-center justify-center rounded border transition-all ${
                        isSelected
                          ? "bg-primary border-primary text-primary-foreground"
                          : "border-border-strong"
                      }`}
                      aria-hidden="true"
                    >
                      {isSelected && <Check className="h-3 w-3" />}
                    </span>
                    <span className="flex-1 truncate">{opt.label}</span>
                    <span className="flex-shrink-0 text-[10px] text-foreground-subtle tabular-nums">
                      {opt.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}