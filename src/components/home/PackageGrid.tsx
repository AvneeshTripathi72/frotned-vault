"use client";

import { motion } from "framer-motion";
import { ChevronRight, Target, Flame, Rocket, Sparkles, Zap, Shield, Heart } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    title: "LinkedIn Hacks",
    subtitle: "High-growth authority framework",
    icon: Target,
    items: Array(4).fill({ title: "Profile Boost", icon: Shield, platform: "LinkedIn" }),
  },
  {
    title: "SEO Hacks",
    subtitle: "Keyword domination strategy",
    icon: Flame,
    items: Array(4).fill({ title: "Backlink Sniper", icon: Target, platform: "Search" }),
  },
  {
    title: "Startup Ideas Hacks",
    subtitle: "Rapid validation & MVP blueprints",
    icon: Rocket,
    items: Array(4).fill({ title: "MVP Generator", icon: Zap, platform: "Idea" }),
  }
];

export const PackageGrid = () => {
  return (
    <section className="container mx-auto px-6 space-y-12">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">Premium Guide Packages</h2>
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
        {packages.map((pkg, i) => (
          <motion.div
            key={pkg.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group"
          >
            <div className="h-full p-8 rounded-[3rem] bg-card/40 backdrop-blur-xl border border-border/40 overflow-hidden group-hover:border-primary/50 transition-all duration-500 hover:shadow-2xl relative">
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">{pkg.title}</h3>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{pkg.subtitle}</p>
                  </div>
                </div>

                {/* 2x2 Grid of Sub-Cards */}
                <div className="grid grid-cols-2 gap-3">
                  {pkg.items.map((item, j) => (
                    <div 
                      key={j} 
                      className="p-4 rounded-2xl bg-muted/30 border border-border/20 hover:border-primary/30 transition-all cursor-pointer group/item flex flex-col gap-3"
                    >
                      <div className="size-10 rounded-xl bg-background flex items-center justify-center text-muted-foreground group-hover/item:text-primary shadow-sm">
                        <item.icon size={18} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[11px] font-black uppercase tracking-widest text-foreground line-clamp-1">{item.title}</p>
                        <span className="text-[9px] font-bold text-muted-foreground">{item.platform}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                   <Link href="/explore" className="w-full h-12 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-black uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-white transition-all">
                      ACCESS FULL PACK
                   </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
