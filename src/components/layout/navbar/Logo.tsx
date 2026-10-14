"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import type { SiteSettings } from "@/types";

interface LogoProps {
  showText?: boolean;
  settings: SiteSettings;
}

export default function Logo({ showText = true, settings }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-3 group shrink-0">
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-primary/40 group-hover:ring-primary transition-all shadow-md"
      >
        <Image
          src={settings.logo}
          alt={settings.siteName}
          width={44}
          height={44}
          className="h-full w-full object-cover"
          priority
        />
      </motion.div>

      {showText && (
        <span className="text-xl sm:text-2xl font-bold text-gradient whitespace-nowrap">
          {settings.siteName}
        </span>
      )}
    </Link>
  );
}