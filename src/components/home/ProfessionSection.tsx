"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { FaPaintBrush, FaCode, FaUserTie, FaVideo, FaPalette } from "react-icons/fa";

const professions = [
  {
    name: "Content Creators",
    icon: <FaVideo />
  },
  {
    name: "Founders & Entrepreneur",
    icon: <FaUserTie />
  },
  {
    name: "Designers",
    icon: <FaPaintBrush />
  },
  {
    name: "Website Developer",
    icon: <FaCode />
  },
  {
    name: "Artists",
    icon: <FaPalette />
  }
];

export const ProfessionSection = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12">
      <div className="bg-card border-none rounded-[2.5rem] p-8 md:p-12 space-y-12 relative overflow-hidden transition-all duration-500 shadow-xl group/main">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none group-hover/main:bg-primary/10 transition-all duration-700" />
        
        <div className="flex flex-col items-start gap-2 mb-2 relative z-10">
          <div className="flex items-center gap-3">
            <div className="h-[2px] w-12 bg-primary/40 rounded-full" />
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground transition-colors group-hover/main:text-primary/90">
              Prompts for Professionals
            </h2>
          </div>
          <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60 ml-16">Customized engineering for high-performance roles</p>
        </div>

        <div className="flex flex-wrap items-start justify-center md:justify-between gap-10 md:gap-4 relative z-10 px-4">
          {professions.map((prof, i) => (
            <motion.div
              key={prof.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="group cursor-pointer flex flex-col items-center gap-4 w-28 md:w-32"
            >
              {/* The Small Circle Icon */}
              <div className="size-20 md:size-24 flex items-center justify-center rounded-full border-none bg-card/50 backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 group-hover:-translate-y-2 relative overflow-hidden group-hover:bg-card">
                <div className="size-10 md:size-12 rounded-full bg-secondary/40 border-none flex items-center justify-center text-lg md:text-xl text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-500 shadow-inner group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)] relative z-10">
                  {prof.icon}
                </div>
                
                {/* Pulsing Gradient Border Effect on Hover */}
                <div className="absolute inset-0 border-[3px] border-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[pulse_2s_infinite]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Text Label Below */}
              <div className="space-y-1.5 text-center px-1">
                <span className="text-[10px] md:text-[11px] font-black tracking-tighter text-foreground/70 group-hover:text-foreground transition-colors leading-tight block uppercase text-balance h-8">
                  {prof.name}
                </span>
                <div className="h-[2px] w-4 bg-primary/20 mx-auto rounded-full group-hover:w-10 group-hover:bg-primary transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
