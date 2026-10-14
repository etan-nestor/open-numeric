"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import type { TeamMember } from "@/types";

interface AboutTeamProps {
  members: TeamMember[];
}

function getTeamText(member: TeamMember, locale: string) {
  const tr = member.translations.find((t) => t.locale === locale);
  const fallback = member.translations[0];
  return {
    name: tr?.name ?? fallback?.name ?? member.key,
    role: tr?.role ?? fallback?.role ?? "",
    bio: tr?.bio ?? fallback?.bio ?? "",
  };
}

export default function AboutTeam({ members }: AboutTeamProps) {
  const t = useTranslations("about.team");
  const locale = useLocale();

  return (
    <section
      aria-labelledby="about-team-title"
      className="relative py-16 lg:py-24 bg-background-alt"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="text-xs uppercase tracking-widest font-bold text-foreground-subtle mb-3 block">
            {t("label")}
          </span>
          <h2
            id="about-team-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4"
          >
            {t("title")}{" "}
            <span className="text-gradient">{t("titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg text-foreground-muted">
            {t("subtitle")}
          </p>
        </motion.div>

        <ul
          role="list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {members.map((member, i) => {
            const text = getTeamText(member, locale);

            return (
              <motion.li
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group rounded-2xl overflow-hidden border border-border bg-surface hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={`${text.name}, ${text.role} chez Open Numeric`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        aria-label={`Profil LinkedIn de ${text.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 backdrop-blur text-white hover:bg-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        aria-label={`Profil Twitter de ${text.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/10 backdrop-blur text-white hover:bg-primary transition-colors"
                      >
                        <Twitter className="h-4 w-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-foreground">
                    {text.name}
                  </h3>
                  <p className="text-xs font-semibold text-primary mt-0.5 mb-3">
                    {text.role}
                  </p>
                  <p className="text-sm text-foreground-muted leading-relaxed">
                    {text.bio}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}