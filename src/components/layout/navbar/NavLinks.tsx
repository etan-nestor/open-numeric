"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";

interface NavLinkProps {
  href: string;
  label: string;
  pathname: string;
  indicatorId?: string;
}

export default function NavLink({
  href,
  label,
  pathname,
  indicatorId = "nav-indicator",
}: NavLinkProps) {
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        isActive ? "text-primary" : "text-foreground-muted hover:text-foreground"
      }`}
    >
      {label}
      {isActive && (
        <motion.span
          layoutId={indicatorId}
          className="absolute -top-1 left-1/2 -translate-x-1/2 h-1 w-10 rounded-full bg-gradient-primary glow-primary"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </Link>
  );
}