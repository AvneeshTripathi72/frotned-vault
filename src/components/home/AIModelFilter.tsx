"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const models = [
  { name: "ChatGPT", image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", color: "#10a37f" },
  { name: "Midjourney", image: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128", color: "#AC8BF6" },
  { name: "Claude", image: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", color: "#d97757" },
  { name: "Stable Diffusion", image: "https://www.google.com/s2/favicons?domain=stability.ai&sz=128", color: "#3B82F6" },
  { name: "DALL-E", image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", color: "#F59E0B" },
  { name: "Llama", image: "https://www.google.com/s2/favicons?domain=meta.com&sz=128", color: "#8B5CF6" },
  { name: "Copilot", image: "https://www.google.com/s2/favicons?domain=github.com&sz=128", color: "#0EA5E9" },
  { name: "Gemini", image: "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128", color: "#4F46E5" },
  { name: "Sora", image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", color: "#E11D48" },
  { name: "Perplexity", image: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128", color: "#06B6D4" },
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
        "size-14 md:size-16 rounded-full bg-white overflow-hidden flex items-center justify-center border transition-all duration-300 relative",
        "border-border/40 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] shadow-sm"
      )}>
        <img 
          src={model.image} 
          alt={model.name}
          className="w-[60%] h-[60%] object-contain transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${model.name.replace(" ", "+")}&background=random&color=fff&size=100`;
            e.currentTarget.className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110";
          }}
        />
        
        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 mix-blend-overlay" style={{ backgroundColor: model.color }} />
      </div>
      <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors text-center">
        {model.name}
      </span>
    </motion.button>
  );
};
