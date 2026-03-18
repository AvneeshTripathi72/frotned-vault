"use client";

import { motion } from "framer-motion";
import { PromptCard } from "@/components/prompt/PromptCard";

export const FavouritesGrid = ({ prompts }: { prompts: any[] }) => {
  // Use mock data if prompts are not provided (targeting 12 total)
  const displayPrompts = prompts.length >= 12 ? prompts.slice(0, 12) : Array(12).fill({ 
    title: "Premium AI Persona", tagline: "High-intelligence behavioral architecture", price: 399, rating: 5.0, platform: "GPT-4", seller: "PersonaMaster" 
  }).map((p, i) => ({ ...p, title: `${p.title} v${i + 1}` }));

  return (
    <section className="container mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {displayPrompts.map((prompt, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (index % 6) * 0.1 }}
            className="h-full"
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
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};
