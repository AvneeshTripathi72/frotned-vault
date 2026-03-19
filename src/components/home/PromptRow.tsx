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
  compact?: boolean;
  hideDetails?: boolean;
}

export const PromptRow = ({ title, subtitle, prompts, href, aspectRatio, isVideo, isCode, compact, hideDetails }: PromptRowProps) => {
  const compactClasses = "min-w-[100px] w-[100px] sm:min-w-[120px] sm:w-[120px] md:min-w-[140px] md:w-[140px] lg:min-w-[160px] lg:w-[160px] xl:min-w-[180px] xl:w-[180px] 2xl:min-w-[200px] 2xl:w-[200px]";
  const normalClasses = "min-w-[180px] w-[180px] sm:min-w-[220px] sm:w-[220px] md:min-w-[240px] md:w-[240px] lg:min-w-[260px] lg:w-[260px] xl:min-w-[15.5vw] xl:w-[15.5vw]";
  
  const cardDims = compact ? compactClasses : normalClasses;

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

      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-6 -mx-4 px-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scrollbar-hide snap-x snap-mandatory items-stretch relative">
        {prompts.map((prompt, index) => (
          <div 
            key={prompt.id || index} 
            className={`${cardDims} snap-start shrink-0`}
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
                hideDetails={hideDetails}
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
