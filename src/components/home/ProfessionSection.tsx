"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const professions = [
  { name: "Content Creators", label: "Content Creators", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop" },
  { name: "Founders & Entrepreneur", label: "Founders & Entrepreneur", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" },
  { name: "Designers", label: "Designers", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
  { name: "Website Developer", label: "Website Developer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" },
  { name: "Artists", label: "Artists", image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=200&h=200&fit=crop" },
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
              <img 
                src={prof.image} 
                alt={prof.name} 
                className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500" />
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
