"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PromptCard } from "@/components/prompt/PromptCard";

interface StackedPromptRowProps {
  title: string | React.ReactNode;
  prompts: any[];
  href: string;
}

export const StackedPromptRow = ({ title, prompts, href }: StackedPromptRowProps) => {
  return (
    <section className="container mx-auto px-6 space-y-8 py-4">
      {title && (
        <div className="flex items-end justify-between px-2">
          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <h2 className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-3">{title}</h2>
            </div>
            <div className="h-1.5 w-16 bg-primary/40 rounded-full" />
          </div>
          
          <Link 
            href={href} 
            className="flex items-center gap-1.5 text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:gap-3 transition-all duration-300 group pb-2"
          >
            See more <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      <div className="flex gap-8 overflow-x-auto pb-10 pt-4 scrollbar-hide snap-x">
        {prompts.map((prompt, index) => (
          <div 
            key={index}
            className="snap-start shrink-0 min-w-[220px] w-[220px] md:min-w-[260px] md:w-[260px] first:pl-2"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <PromptCard 
                id={prompt.id || prompt._id || index}
                title={prompt.title}
                previewImage={prompt.images?.[0] || ""}
                platform={prompt.platform}
                price={prompt.price}
                rating={prompt.rating}
                author={prompt.author || { username: prompt.seller || "creator", avatar: "" }}
                isVideo={false}
                isCode={false}
                promptPreview={""}
              />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
