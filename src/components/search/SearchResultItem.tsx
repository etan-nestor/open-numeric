"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  FolderKanban,
  Briefcase,
  Users,
  Star,
  Quote,
  Compass,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import type { SearchResult, SearchResultType } from "@/types";

interface SearchResultItemProps {
  result: SearchResult;
  onClose: () => void;
}

const TYPE_CONFIG: Record<
  SearchResultType,
  { icon: LucideIcon; accent: string }
> = {
  project: { icon: FolderKanban, accent: "from-blue-500 to-cyan-500" },
  service: { icon: Briefcase, accent: "from-emerald-500 to-teal-500" },
  team: { icon: Users, accent: "from-purple-500 to-pink-500" },
  client: { icon: Star, accent: "from-amber-500 to-orange-500" },
  testimonial: { icon: Quote, accent: "from-rose-500 to-pink-500" },
  nav: { icon: Compass, accent: "from-indigo-500 to-violet-500" },
};

function useTypeLabel() {
  const t = useTranslations("search.types");
  return (type: SearchResultType) => t(type);
}

export default function SearchResultItem({
  result,
  onClose,
}: SearchResultItemProps) {
  const getTypeLabel = useTypeLabel();
  const config = TYPE_CONFIG[result.type];
  if (!config) return null;
  const Icon = config.icon;

  return (
    <Link
      href={result.url}
      onClick={onClose}
      className="group flex items-start gap-4 px-4 py-3 rounded-xl hover:bg-surface-hover transition-colors"
    >
      <div
        className={`flex-shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${config.accent} text-white shadow-md transition-transform group-hover:scale-110`}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <p className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
            {result.title}
          </p>
          <span className="flex-shrink-0 text-[10px] uppercase tracking-wider font-bold text-foreground-subtle">
            {getTypeLabel(result.type)}
          </span>
        </div>
        {result.excerpt && (
          <p className="text-xs text-foreground-muted line-clamp-2 leading-relaxed">
            {result.excerpt}
          </p>
        )}
      </div>

      <ArrowUpRight
        className="flex-shrink-0 h-4 w-4 text-foreground-subtle opacity-0 group-hover:opacity-100 transition-opacity mt-1"
        aria-hidden="true"
      />
    </Link>
  );
}