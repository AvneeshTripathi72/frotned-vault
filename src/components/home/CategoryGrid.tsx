"use client";

import { motion } from "framer-motion";
import { ChevronRight, Camera, Video, Code, Search, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const categories = [
  { 
    title: "Photography & Imaging", 
    tagline: "image generation, transformation, scaling", 
    icon: Camera,
    color: "#3B82F6"
  },
  { 
    title: "Video Generation", 
    tagline: "Sora, Pika, Runway, motion FX", 
    icon: Video,
    color: "#E11D48"
  },
  { 
    title: "Coding & Technical", 
    tagline: "React, Python, architecture, debugging", 
    icon: Code,
    color: "#8B5CF6"
  },
  { 
    title: "SEO & Content", 
    tagline: "blogging, keyword research, copywriting", 
    icon: Search,
    color: "#F59E0B"
  },
  { 
    title: "Research & Strategy", 
    tagline: "market analysis, planning, data gen", 
    icon: BrainCircuit,
    color: "#10B981"
  },
];

export const CategoryGrid = () => {
  return (
    <section className="container mx-auto px-6 space-y-12">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">Broad Categories</h2>
          <div className="h-1 w-12 bg-primary rounded-full opacity-50" />
        </div>
        <Link 
          href="/categories" 
          className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:gap-3 transition-all duration-300 group"
        >
          See more <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <div className="h-full p-8 rounded-[2.5rem] bg-card/40 backdrop-blur-xl border border-border/40 overflow-hidden group-hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
              {/* Icon Background Decoration */}
              <div 
                className="absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none"
                style={{ color: cat.color }}
              >
                <cat.icon size={120} />
              </div>

              <div className="space-y-6 relative z-10">
                <div 
                  className="size-12 rounded-2xl flex items-center justify-center transition-all bg-muted/50 group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20 shadow-sm"
                >
                  <cat.icon size={20} className="transition-transform group-hover:scale-110" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-black tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-6 right-8 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <ChevronRight className="w-5 h-5 text-primary" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
