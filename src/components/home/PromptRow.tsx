"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { PromptCard } from "@/components/prompt/PromptCard";

interface PromptRowProps {
  title: string | React.ReactNode;
  subtitle?: string[];
  prompts: any[];
  href: string;
  itemsPerRow?: number;
  aspectRatio?: string;
  isVideo?: boolean;
  isCode?: boolean;
}

export const PromptRow = ({ title, subtitle, prompts, href, aspectRatio, isVideo, isCode }: PromptRowProps) => {
  return (
    <section className="w-full px-4 sm:px-8 lg:px-12 space-y-4">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground flex items-center gap-3">{title}</h2>
            {subtitle && (
              <div className="hidden sm:flex items-center gap-2">
                {subtitle.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-full border border-border/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 md:gap-5 overflow-x-auto pb-6 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scrollbar-hide snap-x snap-mandatory items-stretch relative">
        {prompts.map((prompt, index) => (
          <div 
            key={prompt.id || index} 
            className="min-w-[120px] w-[120px] sm:min-w-[140px] sm:w-[140px] md:min-w-[160px] md:w-[160px] lg:min-w-[180px] lg:w-[180px] xl:min-w-[200px] xl:w-[200px] 2xl:min-w-[220px] 2xl:w-[220px] snap-start shrink-0"
          >
             <PromptCard 
                id={prompt.id || prompt._id}
                title={prompt.title}
                tagline={prompt.tagline}
                price={prompt.price}
                rating={prompt.rating}
                platform={prompt.platform}
                author={prompt.author || { username: prompt.seller || "anon", avatar: "" }}
                previewImage={prompt.images?.[0] || ""}
                promptPreview={prompt.promptText || ""}
                aspectRatio={aspectRatio}
                isVideo={isVideo}
                isCode={isCode}
             />
          </div>
        ))}

        {/* See More Link placed at the end of the row track matching wireframe */}
        <div className="shrink-0 snap-end flex items-center justify-center min-w-[100px] pr-8">
           <Link 
            href={href} 
            className="flex items-center gap-2 text-foreground/80 hover:text-primary text-sm font-bold tracking-wider group transition-all"
           >
             See more <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>
      </div>
    </section>
  );
};
