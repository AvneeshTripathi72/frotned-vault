"use client";

import { motion } from "framer-motion";
import { ChevronRight, Zap, Target, Rocket, Sparkles, Flame, Shield, LayoutGrid } from "lucide-react";
import Link from "next/link";

const trendingRows = [
  { 
    title: "Trending in Daily Hacks", 
    prompts: Array(8).fill({ title: "Daily Productivity", desc: "Auto-plan your day with AI" }) 
  },
  { 
    title: "Trending in Image Generation", 
    prompts: Array(8).fill({ title: "Hyper-Realistic FX", desc: "Studio quality portrait prompts" }) 
  },
  { 
    title: "Trending in Video Generation", 
    prompts: Array(8).fill({ title: "Cinematic Motion", desc: "Sora & Luma motion architectures" }) 
  },
  { 
    title: "Trending in Persona", 
    prompts: Array(8).fill({ title: "Executive Voice", desc: "Professional identity personas" }) 
  },
  { 
    title: "Trending in Agents", 
    prompts: Array(8).fill({ title: "Auto-Researcher", desc: "Autonomous agentic workflow" }) 
  },
];

export const TrendingDashboard = ({ prompts = [] }: { prompts?: any[] }) => {
  // Creating realistic dynamic rows using db data
  const trendingRows = [
    { 
      title: "Trending in Daily Hacks", 
      prompts: prompts.length > 0 ? prompts.slice(0, 6) : Array(6).fill({ title: "Daily Productivity", tagline: "Auto-plan your day with AI" }) 
    },
    { 
      title: "Trending in Image Generation", 
      prompts: prompts.length > 0 ? prompts.slice(2, 8) : Array(6).fill({ title: "Hyper-Realistic FX", tagline: "Studio quality portrait prompts" }) 
    },
    { 
      title: "Trending in Video Generation", 
      prompts: prompts.length > 0 ? prompts.slice(4, 10).reverse() : Array(6).fill({ title: "Cinematic Motion", tagline: "Sora & Luma motion architectures" }) 
    },
  ];

  return (
    <section className="w-full bg-[#050510] py-24 border-y border-white/5 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 space-y-16 relative z-10">
        <div className="space-y-2">
          <Badge text="Live Analytics" />
          <h2 className="text-4xl font-black tracking-tight text-white">Trending Dashboard</h2>
          <p className="text-muted-foreground font-medium text-sm">Real-time architecture performance tracking across all categories.</p>
        </div>

        <div className="space-y-12">
          {trendingRows.map((row, i) => (
            <div key={row.title} className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary/80 flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-primary animate-pulse" />
                  {row.title}
                </h3>
                <Link href="/explore" className="text-[10px] font-bold text-muted-foreground hover:text-white transition-colors">VIEW ALL</Link>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x">
                {row.prompts.map((p, j) => (
                  <Link href={`/prompt/${p._id || p.id || "explore"}`} key={p._id || j} className="snap-start shrink-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.05 }}
                      className="min-w-[200px] w-[200px] p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-white/10 transition-all cursor-pointer group"
                    >
                      <div className="aspect-[16/10] rounded-2xl bg-[#0a0a0a] mb-4 overflow-hidden relative border border-white/5 shadow-inner">
                          {p.images?.[0] ? (
                            <img src={p.images[0]} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.5)_100%)] flex items-center justify-center">
                              <span className="text-white/20 text-[10px] tracking-widest font-mono uppercase">Render</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
                          
                          {/* Status Badge */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                             <div className="size-6 rounded-lg bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-primary shadow-2xl">
                                <Zap size={10} className="fill-primary" />
                             </div>
                          </div>
                      </div>
                      
                      <div className="space-y-1.5 px-1">
                         <h4 className="text-[13px] font-black tracking-tight text-white group-hover:text-primary transition-colors leading-tight truncate">
                          {p.title}
                         </h4>
                         <p className="text-[10px] font-medium text-muted-foreground/60 line-clamp-2 leading-relaxed group-hover:text-muted-foreground transition-colors">
                          {p.tagline || p.desc || p.short_description || "A masterfully engineered prompt structure."}
                         </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Badge = ({ text }: { text: string }) => (
  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
    {text}
  </span>
);
