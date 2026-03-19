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
    <section className="container mx-auto px-6 space-y-8">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">{title}</h2>
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
          <div className="h-1 w-12 bg-primary rounded-full opacity-50 transition-all duration-500 hover:w-24" />
        </div>
        
        <Link 
          href={href} 
          className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:gap-3 transition-all duration-300 group"
        >
          See more <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
        {prompts.map((prompt, index) => (
          <motion.div 
            key={prompt.id || index} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`min-w-[280px] w-72 md:min-w-[320px] md:w-80 snap-start shrink-0`}
          >
             <PromptCard 
                id={prompt.id || prompt._id}
                title={prompt.title}
                tagline={prompt.tagline}
                price={prompt.price}
                rating={prompt.rating}
                platform={prompt.platform}
                author={prompt.author || { username: prompt.seller, avatar: "" }}
                previewImage={prompt.images?.[0] || ""}
                promptPreview={prompt.promptText || ""}
                aspectRatio={aspectRatio}
                isVideo={isVideo}
                isCode={isCode}
             />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
