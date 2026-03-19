"use client";

import { motion } from "framer-motion";
import { ChevronRight, Target, Flame, Rocket, Sparkles, Zap, Shield, Heart, Star, TrendingUp, Search } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    title: "LinkedIn Dominance Pack",
    description: "4 specialized protocols to command your niche on LinkedIn.",
    items: [
      { title: "Profile Authority v2", icon: Shield, platform: "LinkedIn" },
      { title: "Viral Hook Architect", icon: Zap, platform: "LinkedIn" },
      { title: "DM Conversion Logic", icon: Star, platform: "LinkedIn" },
      { title: "Organic Growth Engine", icon: TrendingUp, platform: "LinkedIn" },
    ],
    color: "from-blue-600 to-cyan-500",
    icon: Target,
  },
  {
    title: "SEO Masterclass Pack",
    description: "Battle-tested blueprints for ranking on Google.",
    items: [
      { title: "Keyword Sniper Pro", icon: Search, platform: "SEO" },
      { title: "Backlink Strategist", icon: Star, platform: "SEO" },
      { title: "Content Pillar Gen", icon: Shield, platform: "SEO" },
      { title: "Technical Audit Bot", icon: Zap, platform: "SEO" },
    ],
    color: "from-purple-600 to-pink-500",
    icon: Flame,
  },
  {
    title: "Startup & Innovation Pack",
    description: "Rapid validation, MVP blueprints, and scale logic.",
    items: [
      { title: "MVP Generator", icon: Zap, platform: "Startup" },
      { title: "Market Fit Analysis", icon: Target, platform: "Startup" },
      { title: "Pitch Deck Logic", icon: Sparkles, platform: "Startup" },
      { title: "Unit Econ Architect", icon: Shield, platform: "Startup" },
    ],
    color: "from-green-600 to-lime-500",
    icon: Rocket,
  }
];

export const PackageGrid = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12">
      <div className="bg-card border border-border/40 rounded-[2.5rem] p-8 md:p-12 space-y-12 relative overflow-hidden transition-all duration-500 shadow-xl group/main">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-primary/40 rounded-full" />
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground">Guides & Packs</h2>
            </div>
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60 ml-16">High-Yield curated engineering bundles</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {packages.map((pkg, i) => (
            <div key={pkg.title} className="flex flex-col space-y-8 p-8 rounded-[2.5rem] border border-border/40 bg-background/50 hover:bg-background transition-all duration-500 group relative">
                <div className="flex items-start justify-between">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-black tracking-tighter text-foreground uppercase">{pkg.title}</h3>
                    <p className="text-[11px] font-medium text-muted-foreground line-clamp-1">{pkg.description}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg bg-gradient-to-br ${pkg.color}`}>
                    <pkg.icon size={22} strokeWidth={2.5} />
                  </div>
                </div>

                {/* 2x2 Grid of Sub-Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {pkg.items.map((item, j) => (
                    <div 
                      key={j} 
                      className="p-5 rounded-[1.8rem] bg-card border border-border/40 hover:border-primary/40 hover:bg-secondary/20 transition-all duration-500 cursor-pointer group/item flex flex-col gap-4 shadow-sm hover:shadow-lg relative overflow-hidden"
                    >
                      <div className="w-12 h-12 rounded-[1.2rem] bg-background flex items-center justify-center text-muted-foreground group-hover/item:text-primary group-hover/item:scale-110 transition-all duration-500 shadow-sm border border-border/20">
                        <item.icon size={22} strokeWidth={2.5} />
                      </div>
                      <div className="space-y-1.5 relative z-10">
                        <p className="text-[12px] md:text-[13px] font-black tracking-tight text-foreground line-clamp-1 group-hover/item:text-primary transition-colors">{item.title}</p>
                        <div className="flex items-center gap-2">
                          <div className="h-[2px] w-4 bg-primary/40 rounded-full" />
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{item.platform}</span>
                        </div>
                      </div>
                      
                      {/* Subtle hover background highlight */}
                      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                   <Link href="/explore" className="w-full h-14 rounded-[1.5rem] bg-primary text-white flex items-center justify-center font-black uppercase tracking-[0.2em] text-[11px] hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20">
                      ACCESS FULL PACK
                   </Link>
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
