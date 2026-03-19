"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const models = [
  { name: "Midjourney", image: "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128", color: "#AC8BF6" },
  { name: "ChatGPT", image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", color: "#10a37f" },
  { name: "Claude", image: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128", color: "#d97757" },
  { name: "Stable Diffusion", image: "https://www.google.com/s2/favicons?domain=stability.ai&sz=128", color: "#3B82F6" },
  { name: "DALL-E", image: "https://www.google.com/s2/favicons?domain=openai.com&sz=128", color: "#F59E0B" },
  { name: "Llama", image: "https://www.google.com/s2/favicons?domain=meta.com&sz=128", color: "#8B5CF6" },
  { name: "Copilot", image: "https://www.google.com/s2/favicons?domain=github.com&sz=128", color: "#0EA5E9" },
  { name: "Perplexity", image: "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128", color: "#06B6D4" },
];

export const AIModelFilter = () => {
  return (
    <section className="w-full">
      <div className="flex flex-wrap md:flex-nowrap gap-4 md:gap-6 w-full items-center justify-start overflow-x-auto pb-4 scrollbar-hide px-6">
        {models.map((model, i) => (
          <ModelCircle key={model.name} model={model} i={i} />
        ))}
        {/* Placeholder circles just like the wireframe for expansion */}
        {Array(3).fill(0).map((_, i) => (
          <div key={`empty-${i}`} className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-full border border-border/40 bg-card/10 opacity-50" />
        ))}
      </div>
    </section>
  );
};

const ModelCircle = ({ model, i }: { model: any; i: number }) => {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: "backOut" }}
      whileHover={{ y: -5, scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      title={model.name}
      className={cn(
        "shrink-0 group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white dark:bg-[#0a0a0a] border border-border/60 hover:border-primary/50 transition-all duration-300 relative overflow-hidden shadow-sm",
        "hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      )}
    >
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" 
        style={{ background: `radial-gradient(circle at center, ${model.color} 0%, transparent 80%)` }} 
      />
      
      <img 
        src={model.image} 
        alt={model.name}
        className="w-[50%] h-[50%] object-contain opacity-90 group-hover:opacity-100 transition-opacity mix-blend-multiply dark:mix-blend-normal z-10"
        onError={(e) => {
          e.currentTarget.src = `https://ui-avatars.com/api/?name=${model.name.replace(" ", "+")}&background=random&color=fff&size=100`;
          e.currentTarget.className = "w-full h-full object-cover z-10";
        }}
      />
    </motion.button>
  );
};
