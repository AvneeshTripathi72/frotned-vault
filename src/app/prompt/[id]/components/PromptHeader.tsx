"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface PromptHeaderProps {
  platform: string;
  category: string;
  title: string;
  tagline: string;
}

export function PromptHeader({ platform, category, title, tagline }: PromptHeaderProps) {
  return (
    <div className="space-y-16">
      <div className="flex items-center gap-3 text-[10px] uppercase font-black tracking-[0.2em] text-muted-foreground/60">
        <Link href="/explore" className="hover:text-primary transition-colors">Explore</Link> 
        <span className="w-1 h-1 rounded-full bg-muted-foreground/20" /> 
        <span>{platform}</span> 
        <span className="w-1 h-1 rounded-full bg-muted-foreground/20" /> 
        <span className="text-foreground">{title}</span>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-xl font-black">{platform}</Badge>
          <Badge variant="outline" className="border-border/40 px-4 py-1.5 rounded-xl text-muted-foreground font-bold">{category}</Badge>
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none text-foreground">{title}</h1>
          <p className="text-xl text-card-foreground font-medium leading-relaxed max-w-3xl">{tagline}</p>
        </div>
      </div>
    </div>
  );
}
