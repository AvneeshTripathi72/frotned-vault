"use client";

import { motion } from "framer-motion";
import { User, Rocket, Palette, Globe, Code2, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const professions = [
  { name: "Content Creators", icon: Rocket, label: "Content Creators" },
  { name: "Founders & Entrepreneur", icon: Globe, label: "Founders & Entrepreneur" },
  { name: "Designers", icon: Palette, label: "Designers" },
  { name: "Website Developer", icon: Code2, label: "Website Developer" },
  { name: "Artists", icon: Users, label: "Artists" },
];

export const ProfessionSection = () => {
  return (
    <section className="container mx-auto px-6 space-y-8">
      <div className="space-y-1">
        <h2 className="text-3xl font-black tracking-tight text-foreground">Prompts for Professionals</h2>
        <div className="h-1 w-12 bg-primary rounded-full opacity-50" />
      </div>

      <div className="flex flex-wrap justify-center gap-8 md:gap-12">
        {professions.map((prof, i) => (
          <motion.div
            key={prof.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center gap-4 group cursor-pointer"
          >
            <div className="size-20 md:size-24 rounded-full border border-border/40 bg-card/40 backdrop-blur-md flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]">
              <prof.icon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-foreground text-center max-w-[120px]">
              {prof.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
