"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import Link from "next/link";

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
    <section className="w-full relative overflow-hidden transition-colors duration-300">
      
      <div className="w-full px-4 md:px-8 lg:px-12 space-y-4 relative z-10">
        {/* Simple Heading matching the wireframe */}
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground dark:text-white transition-colors">Trending</h2>

        <div className="space-y-10 pt-2 pb-6 w-full">
          {trendingRows.map((row, i) => (
            <div key={row.title} className="space-y-4 w-full border-b border-border/10 pb-10 last:border-b-0 last:pb-0">
              <h3 className="text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-foreground/80 flex items-center gap-2">
                {row.title}
              </h3>

              <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1 scrollbar-hide snap-x">
                {row.prompts.map((p, j) => (
                  <Link href={`/prompt/${p._id || p.id || "explore"}`} key={`${p._id || j}-${i}`} className="snap-start shrink-0">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.03, duration: 0.3 }}
                      className="min-w-[140px] w-[140px] md:min-w-[170px] md:w-[170px] rounded-xl bg-card border border-border/30 hover:border-primary/50 hover:shadow-xl transition-all cursor-pointer group flex flex-col overflow-hidden"
                    >
                      <div className="aspect-[3/4] bg-muted/20 mb-0 relative border-b border-border/20 overflow-hidden">
                          {p.images?.[0] ? (
                            <img src={p.images[0]} alt={p.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-muted-foreground/5 to-muted-foreground/10 flex flex-col items-center justify-center p-2 text-center">
                              <Zap size={16} className="text-muted-foreground/30 mb-1" />
                              <span className="text-muted-foreground/30 text-[8px] tracking-widest font-mono uppercase">Render</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      </div>
                      
                      <div className="p-3 md:p-4 bg-card flex flex-col justify-start gap-1">
                         <h4 className="text-[11px] md:text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors leading-tight truncate">
                          {p.title}
                         </h4>
                         <p className="text-[9px] md:text-xs font-medium text-muted-foreground/70 line-clamp-1 break-all leading-relaxed">
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
