"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sparkles, Play, Code2 } from "lucide-react";
import Link from "next/link";
import { useTilt } from "@/hooks/useTilt";

interface PromptCardProps {
  id: string;
  title: string;
  tagline?: string;
  short_description?: string;
  price: number;
  rating: number;
  platform: string;
  author: { username: string; avatar: string; };
  previewImage: string;
  promptPreview: string;
  aspectRatio?: string;
  isVideo?: boolean;
  isCode?: boolean;
}

export const PromptCard = ({
  id, title, previewImage, aspectRatio = "aspect-square", isVideo, isCode
}: PromptCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { rotateX, rotateY, glow, handleMouseMove, handleMouseLeave: tiltLeave } = useTilt();

  const onMouseLeave = () => {
    setIsHovered(false);
    tiltLeave();
  };

  return (
    <motion.div
      layout
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      whileHover={{ y: -6 }}
      className={`group relative h-full perspective-1000 ${aspectRatio}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <Link href={`/prompt/${id}`} className="block h-full">
        <Card className="glass-card h-full w-full overflow-hidden rounded-2xl flex flex-col border-border/40 bg-card/60 backdrop-blur-xl transition-all duration-300 relative">
          {previewImage && !isCode && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <img src={previewImage} alt="" className="w-full h-full object-cover blur-[80px] scale-150 opacity-20 contrast-150 brightness-110" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />
            </div>
          )}

          <motion.div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: glow }} />
          
          <div className="relative w-full h-full bg-muted/30 overflow-hidden z-20">
            {isCode ? (
              <div className="absolute inset-0 bg-[#0d1117]/90 backdrop-blur-md p-5 font-mono text-[10px] leading-relaxed text-[#c9d1d9] flex flex-col shadow-inner select-none transition-transform duration-500 ease-out group-hover:scale-105">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <Code2 className="w-4 h-4 text-muted-foreground/50" />
                </div>
                <div className="flex-1 overflow-hidden opacity-90 group-hover:opacity-100 transition-opacity whitespace-pre">
                  <span className="text-[#ff7b72]">async function</span> <span className="text-[#d2a8ff]">optimizeLogic</span>() {'{\n'}
                  {'  '}const <span className="text-[#79c0ff]">data</span> = <span className="text-[#ff7b72]">await</span> <span className="text-[#d2a8ff]">fetchCore</span>();{'\n'}
                  {'  '}<span className="text-[#ff7b72]">if</span> (!data) <span className="text-[#ff7b72]">return</span> <span className="text-[#79c0ff]">null</span>;{'\n'}
                  {'  '}<span className="text-[#8b949e]">{"// Apply quantum logic"}</span>{'\n'}
                  {'  '}<span className="text-[#ff7b72]">return</span> data.<span className="text-[#d2a8ff]">map</span>(x {'=>'} x * <span className="text-[#79c0ff]">2</span>);{'\n'}
                  {'}'}
                </div>
              </div>
            ) : previewImage ? (
              <>
                <img src={previewImage} alt={title} className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-500 ease-out group-hover:scale-105" />
                {isVideo && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 group-hover:bg-primary/80">
                      <Play className="w-5 h-5 text-white ml-1 fill-white" />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/10 z-10">
                <Sparkles className="w-6 h-6 text-muted-foreground/10" />
              </div>
            )}
          </div>
        </Card>
      </Link>
    </motion.div>
  );
};
