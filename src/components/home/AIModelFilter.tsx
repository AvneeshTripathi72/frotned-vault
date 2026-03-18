"use client";

import { motion } from "framer-motion";
import { 
  Sparkles, 
  Zap, 
  Brain, 
  MessageSquare, 
  ImageIcon, 
  Video, 
  Code, 
  Search, 
  Cpu, 
  Globe 
} from "lucide-react";
import { cn } from "@/lib/utils";

const models = [
  { name: "ChatGPT", icon: MessageSquare, color: "#10a37f" },
  { name: "Midjourney", icon: ImageIcon, color: "#AC8BF6" },
  { name: "Claude", icon: Brain, color: "#d97757" },
  { name: "Stable Diffusion", icon: Sparkles, color: "#3B82F6" },
  { name: "DALL-E", icon: Zap, color: "#F59E0B" },
  { name: "Llama", icon: Cpu, color: "#8B5CF6" },
  { name: "Copilot", icon: Code, color: "#0EA5E9" },
  { name: "Gemini", icon: Sparkles, color: "#4F46E5" },
  { name: "Sora", icon: Video, color: "#E11D48" },
  { name: "Perplexity", icon: Search, color: "#06B6D4" },
];

export const AIModelFilter = () => {
  return (
    <section className="container mx-auto px-6 py-8">
      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {models.slice(0, 5).map((model, i) => (
            <ModelButton key={model.name} model={model} i={i} />
          ))}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
          {models.slice(5).map((model, i) => (
            <ModelButton key={model.name} model={model} i={i + 5} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ModelButton = ({ model, i }: { model: any; i: number }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: i * 0.05 }}
      whileHover={{ y: -4, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group flex flex-col items-center gap-3 w-20 md:w-24"
    >
      <div className={cn(
        "size-14 md:size-16 rounded-full flex items-center justify-center border transition-all duration-300 relative",
        "bg-card/40 backdrop-blur-md border-border/40 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] shadow-sm"
      )}>
        <model.icon 
          className="w-6 h-6 md:w-7 md:h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" 
          strokeWidth={1.5}
        />
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-primary" />
      </div>
      <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors text-center">
        {model.name}
      </span>
    </motion.button>
  );
};
