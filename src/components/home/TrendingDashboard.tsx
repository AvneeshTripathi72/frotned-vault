"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";
import { PromptCard } from "@/components/prompt/PromptCard";

export const TrendingDashboard = ({ prompts = [] }: { prompts?: any[] }) => {
  // Creating realistic dynamic rows using db data and matching exactly the requested mockup
  const trendingRows = [
    { 
      title: "Trending in Daily Hacks", 
      prompts: prompts.length > 0 ? prompts.slice(0, 10) : Array(10).fill({ title: "Daily Hacks", tagline: "Auto-plan your day" }) 
    },
    { 
      title: "Trending in image generation", 
      prompts: prompts.length > 4 ? prompts.slice(2, 12) : Array(10).fill({ title: "Image Promo", tagline: "Studio portraits" }) 
    },
    { 
      title: "Trending in Video generation", 
      prompts: prompts.length > 8 ? prompts.slice(4, 14).reverse() : Array(10).fill({ title: "Video Motion", tagline: "Sora & Luma motion" }) 
    },
    { 
      title: "Trending in persona", 
      prompts: prompts.length > 1 ? prompts.slice(1, 11) : Array(10).fill({ title: "Executive Voice", tagline: "Identity personas" }) 
    },
    { 
      title: "Trending in agents", 
      prompts: prompts.length > 3 ? prompts.slice(3, 13).reverse() : Array(10).fill({ title: "Auto-Researcher", tagline: "Agentic workflow" }) 
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-8">
      <div className="bg-card border-none rounded-[2.5rem] p-8 md:p-12 space-y-10 relative overflow-hidden transition-all duration-500 shadow-xl group">
        {/* Subtle Background Glow - Theme Aware */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
        
        <div className="flex items-center justify-between relative z-10">
          <div className="space-y-1.5">
            <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-foreground transition-colors">Trending Now</h2>
            <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60">Hottest prompts across categories</p>
          </div>
        </div>

        <div className="space-y-10 relative z-10">
          {trendingRows.map((row, i) => (
            <div key={row.title} className="space-y-4 w-full group/row">
              <div className="flex items-center gap-4">
                <div className="h-[2px] w-10 bg-primary/40 rounded-full" />
                <h3 className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.35em] text-muted-foreground group-hover/row:text-primary transition-colors">
                  {row.title}
                </h3>
                <div className="h-px flex-1 bg-border/20" />
              </div>

              <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x pt-1">
                {row.prompts.map((p, j) => (
                  <div key={`${p._id || j}-${i}`} className="snap-start shrink-0 min-w-[150px] w-[150px] md:min-w-[180px] md:w-[180px] first:pl-2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.02, duration: 0.4 }}
                    >
                      <PromptCard 
                        id={p._id || p.id || "explore"}
                        title={p.title}
                        previewImage={p.images?.[0] || ""}
                        platform={p.platform || "AI Prompt"}
                        price={p.price || 50}
                        rating={p.rating || 5}
                        author={p.author || { username: p.seller || "anon", avatar: "" }}
                        isVideo={false}
                        isCode={false}
                        promptPreview={""}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
