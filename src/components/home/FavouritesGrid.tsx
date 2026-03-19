"use client";

import { motion } from "framer-motion";
import { PromptCard } from "@/components/prompt/PromptCard";

export const FavouritesGrid = ({ prompts }: { prompts: any[] }) => {
  // Use mock data if prompts are not provided (targeting 12 total)
  const displayPrompts = prompts.length >= 12 ? prompts.slice(0, 12) : Array(12).fill({ 
    title: "Premium AI Persona", tagline: "High-intelligence behavioral architecture", price: 399, rating: 5.0, platform: "GPT-4", seller: "PersonaMaster" 
  }).map((p, i) => ({ ...p, title: `${p.title} v${i + 1}` }));

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4 sm:gap-6">
        {displayPrompts.map((prompt, index) => (
          <div
            key={index}
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
          </div>
        ))}
      </div>
    </section>
  );
};
