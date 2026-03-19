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
            className="group relative h-full cursor-pointer"
          >
            <div className="h-full p-8 rounded-[2rem] bg-[#0a0a0a] border border-white/10 relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-white/20">
              {/* Colored Glow Orb */}
              <div 
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-[60px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" 
                style={{ backgroundColor: cat.color }} 
              />
              
              <div className="space-y-6 relative z-10 flex flex-col h-full">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 shadow-sm group-hover:scale-110 group-hover:rotate-3" 
                  style={{ 
                    color: cat.color, 
                    borderColor: `${cat.color}40`, 
                    backgroundColor: `${cat.color}15` 
                  }}
                >
                  <cat.icon size={24} strokeWidth={2.5} />
                </div>
                
                <div className="space-y-3 mt-auto pt-8">
                  <h3 className="text-xl font-bold tracking-tight text-white/90 group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40 leading-relaxed group-hover:text-white/70 transition-colors">
                    {cat.tagline}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
