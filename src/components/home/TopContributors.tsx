"use client";

import { motion } from "framer-motion";
import { ChevronRight, Users, Star, Zap, User, Clock, Flame } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const contributors = [
  { 
    name: "Noah Thompson", 
    bio: "Senior Architecture Engineer specializing in DALL-E and Midjourney transformer logic.",
    stats: { followers: "71.1k", rating: "10x", views: "342k" },
    avatar: "" 
  },
  { 
    name: "Elena Rossi", 
    bio: "AI Researcher at DeepMind level prompts for advanced agentic workflows and LLM reasoning.",
    stats: { followers: "42.5k", rating: "9.8x", views: "198k" },
    avatar: "" 
  },
  { 
    name: "Marcus Chen", 
    bio: "Content Automation strategist. Created the viral 'Growth Protocol' system used by 50k+ creators.",
    stats: { followers: "128k", rating: "12x", views: "1.2M" },
    avatar: "" 
  },
  { 
    name: "Sarah Jenkins", 
    bio: "Prompt Engineering professor. Focuses on educational architectures and scientific research tools.",
    stats: { followers: "22k", rating: "9.5x", views: "85k" },
    avatar: "" 
  },
  { 
    name: "Liam O'Connor", 
    bio: "Specialist in code-gen prompts for full-stack Next.js and Rust architectures.",
    stats: { followers: "56k", rating: "11x", views: "410k" },
    avatar: "" 
  },
];

export const TopContributors = () => {
  return (
    <section className="container mx-auto px-6 space-y-12">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">Top Contributors</h2>
          <div className="h-1 w-12 bg-primary rounded-full opacity-50 transition-all duration-500 hover:w-24" />
        </div>
        <Link 
          href="/u" 
          className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:gap-3 transition-all duration-300 group"
        >
          See more <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 -mx-6 px-6 scrollbar-hide snap-x">
        {contributors.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="min-w-[340px] w-96 snap-start group"
          >
            <div className="p-8 rounded-[3rem] bg-card/40 backdrop-blur-xl border border-border/40 group-hover:border-primary/50 transition-all duration-500 shadow-sm relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div className="flex items-center gap-6">
                  <div className="size-20 rounded-full border border-border/40 bg-secondary/50 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500 bg-gradient-to-br from-primary/10 to-transparent">
                     <User size={32} className="text-muted-foreground opacity-30" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">{c.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Active_Live</span>
                    </div>
                  </div>
                </div>

                <p className="text-[12px] font-medium text-muted-foreground leading-relaxed">
                  {c.bio}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-border/20">
                  <div className="flex flex-col gap-1 items-center">
                    <div className="flex items-center gap-1 text-primary">
                      <Users size={12} className="fill-primary/20" />
                      <span className="text-sm font-black italic">{c.stats.followers}</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Followers</span>
                  </div>
                  <div className="h-8 w-px bg-border/20" />
                  <div className="flex flex-col gap-1 items-center">
                    <div className="flex items-center gap-1 text-primary">
                      <Star size={12} className="fill-primary/20" />
                      <span className="text-sm font-black italic">{c.stats.rating}</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Rating</span>
                  </div>
                  <div className="h-8 w-px bg-border/20" />
                  <div className="flex flex-col gap-1 items-center">
                    <div className="flex items-center gap-1 text-primary">
                      <Zap size={12} className="fill-primary/20" />
                      <span className="text-sm font-black italic">{c.stats.views}</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">Sales</span>
                  </div>
                </div>
              </div>

              {/* Decorative Blur Background Element */}
              <div className="absolute -bottom-12 -right-12 size-48 bg-primary/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
