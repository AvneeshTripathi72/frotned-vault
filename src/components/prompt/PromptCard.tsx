"use client";


import { Card } from "@/components/ui/card";
import { Sparkles, Play, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
  hideDetails?: boolean;
}

export const PromptCard = ({
  id, title, previewImage, platform, price, rating, author, isVideo, isCode, hideDetails, aspectRatio = "aspect-square"
}: PromptCardProps) => {
  return (
    <div className="h-full group">
      <Link href={`/prompt/${id}`} className="block h-full">
        <Card className="h-full w-full overflow-hidden rounded-[2.5rem] flex flex-col border-none bg-card hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 p-0 group/card">
          
          {/* Top Preview Area */}
          <div className={`relative ${aspectRatio} w-full overflow-hidden bg-muted/10 z-20 transition-all duration-500`}>
            {isCode ? (
              <div className="absolute inset-0 bg-[#08080a] p-6 font-mono text-[10px] leading-relaxed flex flex-col shadow-inner select-none pointer-events-none">
                <div className="flex items-center justify-between pb-3 mb-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                  </div>
                  <Code2 className="w-3.5 h-3.5 text-white/30" />
                </div>
                <div className="flex-1 overflow-hidden whitespace-pre">
                  <span className="text-[#ff5f56]">async function</span> <span className="text-[#4fd1c5]">optimizeLogic</span>() {'{\n'}
                  {'  '}const <span className="text-[#63b3ed]">data</span> = <span className="text-[#ff5f56]">await</span> <span className="text-[#4fd1c5]">fetchCore</span>();{'\n'}
                </div>
              </div>
            ) : previewImage ? (
              <div className="w-full h-full relative">
                <img 
                  src={previewImage} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105" 
                />
                {isVideo && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/10">
                <Sparkles className="w-6 h-6 text-muted-foreground/10" />
              </div>
            )}
          </div>

          {/* New Mockup-Style Bottom Info Bar - Hidden if hideDetails is true */}
          {!hideDetails && (
            <div className="p-5 md:p-6 flex flex-col gap-2 bg-card relative z-30">
              {/* Platform & Dot */}
              <div className="flex items-center gap-2 mb-1">
                <div className={cn("size-2 rounded-full shadow-sm", 
                  platform?.toLowerCase().includes("midjourney") ? "bg-orange-500" : 
                  platform?.toLowerCase().includes("flux") ? "bg-purple-500" : 
                  platform?.toLowerCase().includes("dall") ? "bg-green-500" : "bg-blue-500"
                )} />
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/80">
                  {platform || "AI Generator"}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[14px] md:text-[15px] font-black tracking-tighter text-foreground line-clamp-2 leading-[1.15] min-h-[2.3em]">
                {title}
              </h3>

              {/* Rating/Price Row */}
              <div className="flex items-center gap-1.5 text-primary">
                <Sparkles className="size-3 fill-primary" />
                <span className="text-[11px] font-black">{price || 50}</span>
              </div>

              {/* Buy Now CTA Style */}
              <div className="mt-3 flex items-center justify-between group/btn">
                <span className="text-[11px] md:text-[12px] font-black uppercase tracking-[0.1em] text-muted-foreground/40 group-hover/card:text-primary transition-colors">
                  Buy Now —&gt;
                </span>
                <span className="text-[11px] font-black text-muted-foreground/20 group-hover/card:text-primary/40 transition-colors">
                  {price || 50}
                </span>
              </div>
            </div>
          )}
        </Card>
      </Link>
    </div>
  );
};
