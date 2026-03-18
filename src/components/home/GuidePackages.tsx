"use client";

import { motion } from "framer-motion";
import { ChevronRight, Zap, Target, Rocket, Sparkles, Flame, Shield } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const guides = [
  {
    title: "LinkedIn Hacks",
    subtitle: "High-growth authority framework",
    icon: Target,
    color: "#0A66C2",
    items: [
      { name: "Executive Profile Optimizer", icon: Shield },
      { name: "Viral Post Architect", icon: Zap },
      { name: "Network Multiplier Bot", icon: Target },
    ]
  },
  {
    title: "SEO Hacks",
    subtitle: "Keyword domination strategy",
    icon: Flame,
    color: "#E11D48",
    items: [
      { name: "Top-Tier Content Planner", icon: Flame },
      { name: "Backlink Sniper Gen", icon: Target },
      { name: "Zero-Click Search Boost", icon: Rocket },
    ]
  },
  {
    title: "Startup Ideas Hacks",
    subtitle: "Rapid validation & MVP blueprints",
    icon: Rocket,
    color: "#8B5CF6",
    items: [
      { name: "Problem-Solution Matrix", icon: Sparkles },
      { name: "Venture-Ready Pitch Deck", icon: Rocket },
      { name: "Revenue Engine Architect", icon: Zap },
    ]
  }
];

export const GuidePackages = () => {
  return (
    <section className="container mx-auto px-6 space-y-12">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">Guide & Packages</h2>
          <div className="h-1 w-12 bg-primary rounded-full opacity-50" />
        </div>
        <Link 
          href="/explore" 
          className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:gap-3 transition-all duration-300 group"
        >
          See more <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <motion.div
            key={guide.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="h-full p-8 rounded-[3rem] bg-card/40 backdrop-blur-xl border border-border/40 overflow-hidden group-hover:border-primary/50 transition-all duration-500 hover:shadow-2xl relative shadow-sm">
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{guide.title}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{guide.subtitle}</p>
                  </div>
                  <div className="size-14 rounded-2xl bg-secondary/50 border border-border/40 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                    <guide.icon size={24} />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {guide.items.map((item, j) => (
                    <div 
                      key={item.name} 
                      className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/20 hover:border-primary/30 transition-all cursor-pointer hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                         <div className="size-8 rounded-lg bg-background flex items-center justify-center text-muted-foreground group-hover:text-primary shadow-sm">
                            <item.icon size={14} />
                         </div>
                         <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{item.name}</span>
                      </div>
                      <ChevronRight size={14} className="text-muted-foreground/30" />
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                   <Link href="/explore" className="w-full h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all">
                      Unlock Full Package
                   </Link>
                </div>
              </div>
              
              <div className="absolute -bottom-12 -right-12 size-48 bg-primary/5 blur-3xl rounded-full group-hover:bg-primary/10 transition-colors pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
