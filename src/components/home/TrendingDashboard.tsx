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

export const TrendingDashboard = () => {
  return (
    <section className="w-full bg-[#050510] py-24 border-y border-white/5 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 space-y-16">
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
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05 }}
                    className="min-w-[200px] p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all cursor-pointer group snap-start"
                  >
                    <div className="aspect-video rounded-lg bg-white/5 mb-3 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="space-y-1">
                       <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{p.title}</h4>
                       <p className="text-[10px] text-muted-foreground line-clamp-1">{p.desc}</p>
                    </div>
                  </motion.div>
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
