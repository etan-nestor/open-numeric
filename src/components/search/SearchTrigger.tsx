"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { SearchOverlay } from ".";

export default function SearchTrigger() {
  const t = useTranslations("search");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("trigger")}
        title={`${t("trigger")} (Ctrl+K)`}
        className="flex items-center justify-center h-10 w-10 rounded-lg text-foreground-muted hover:text-foreground hover:bg-surface-hover transition-colors"
      >
        <Search className="h-5 w-5" aria-hidden="true" />
      </button>

      <SearchOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}