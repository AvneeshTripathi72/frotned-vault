"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Linkedin, LineChart, FileText, Search } from "lucide-react";

interface StackedPromptRowProps {
  title: string | React.ReactNode;
  prompts: any[];
  href: string;
}

export const StackedPromptRow = ({ title, prompts, href }: StackedPromptRowProps) => {
  return (
    <section className="container mx-auto px-6 space-y-8">
      <div className="flex items-end justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-3">{title}</h2>
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

      <div className="flex gap-8 overflow-x-auto pb-8 pt-4 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
        {prompts.map((prompt, index) => (
          <Link href={`/prompt/${prompt.id || prompt._id || index}`} key={index}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group min-w-[200px] w-[200px] md:min-w-[240px] md:w-[240px] snap-start flex flex-col gap-3 cursor-pointer"
            >
              <h3 className="font-mono text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                {prompt.tagline || prompt.title}
              </h3>
              
              <div className="relative aspect-square w-full">
                {/* Back card */}
                <div className="absolute inset-0 bg-secondary/80 rounded-xl border border-border/50 transform translate-x-2 -translate-y-2 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300 shadow-sm" />
                
                {/* Front card */}
                <div className="absolute inset-0 bg-card rounded-xl border-2 border-border flex items-center justify-center overflow-hidden z-10 shadow-md group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-300">
                  {prompt.image || prompt.images?.[0] ? (
                     <img src={prompt.image || prompt.images?.[0]} alt={prompt.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <div className="w-full h-full bg-muted/20 flex flex-col items-center justify-center p-6 text-center gap-4 relative overflow-hidden">
                       {/* Very subtle large background icon */}
                       <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none transform scale-150">
                         {prompt.tagline?.toLowerCase().includes("linkedin") || prompt.title.toLowerCase().includes("linkedin") ? (
                           <Linkedin className="w-64 h-64" />
                         ) : prompt.tagline?.toLowerCase().includes("seo") || prompt.title.toLowerCase().includes("seo") ? (
                           <LineChart className="w-64 h-64" />
                         ) : (
                           <FileText className="w-64 h-64" />
                         )}
                       </div>

                       {/* Foreground colored icon */}
                       <div className="p-4 rounded-2xl bg-background shadow-xl border border-border/50 text-primary transform group-hover:scale-110 transition-transform duration-300">
                         {prompt.tagline?.toLowerCase().includes("linkedin") || prompt.title.toLowerCase().includes("linkedin") ? (
                           <Linkedin className="w-10 h-10" />
                         ) : prompt.tagline?.toLowerCase().includes("seo") || prompt.title.toLowerCase().includes("seo") ? (
                           <Search className="w-10 h-10" />
                         ) : (
                           <FileText className="w-10 h-10" />
                         )}
                       </div>
                       
                       <span className="font-bold text-lg text-foreground/80 leading-tight z-10">{prompt.title}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};
