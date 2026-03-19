"use client";

import { Card } from "@/components/ui/card";
import { Sparkles, Play, Code2 } from "lucide-react";
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
        <Card className={`h-full w-full overflow-hidden rounded-[1.5rem] flex flex-col border border-border/40 bg-card hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 p-3 ${hideDetails ? 'pb-3' : 'pb-4'}`}>
          
          {/* Image/Code Container */}
          <div className={`relative ${aspectRatio} w-full rounded-[1.2rem] overflow-hidden bg-muted/30 z-20 group-hover:shadow-lg transition-all duration-500 ${hideDetails ? 'mb-0' : 'mb-4'}`}>
            {isCode ? (
              <div className="absolute inset-0 bg-[#08080a] p-5 font-mono text-[10px] leading-relaxed flex flex-col shadow-inner select-none">
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
                  {'  '}<span className="text-[#ff5f56]">if</span> (!<span className="text-[#63b3ed]">data</span>) <span className="text-[#ff5f56]">return</span> <span className="text-[#f687b3]">null</span>;{'\n'}
                </div>
              </div>
            ) : previewImage ? (
              <div className="w-full h-full relative">
                <img 
                  src={previewImage} 
                  alt={title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                
                {/* Platform Badge Overlay */}
                <div className="absolute top-3 left-3 z-30">
                  <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
                    <span className="text-[9px] font-black tracking-[0.15em] text-white uppercase">{platform || "AI Prompt"}</span>
                  </div>
                </div>

                {isVideo && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                      <Play className="w-5 h-5 text-white ml-1 fill-white" />
                    </div>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-muted/10">
                <Sparkles className="w-8 h-8 text-muted-foreground/10" />
              </div>
            )}
          </div>

          {!hideDetails && (
            <div className="px-1 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-[13px] md:text-[14px] font-black tracking-tight text-foreground line-clamp-2 leading-tight flex-1">
                  {title}
                </h3>
                <div className="flex items-center gap-1.5 shrink-0 bg-secondary/50 px-2 py-1 rounded-full border border-border/40">
                  <svg className="w-3 h-3 text-orange-400 fill-orange-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[11px] font-black text-foreground/80">{rating || 5}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1 pt-3 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold border border-primary/20 relative overflow-hidden">
                    {author.avatar ? (
                      <img src={author.avatar} alt={author.username} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-primary/70">{author.username?.[0]?.toUpperCase()}</span>
                    )}
                  </div>
                  <span className="text-[10px] md:text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors truncate max-w-[80px]">
                    @{author.username}
                  </span>
                </div>
                <div className="text-primary font-black text-[13px] md:text-[15px] flex items-center">
                  <span className="mr-0.5">₹</span>{price || 50}
                </div>
              </div>
            </div>
          )}
        </Card>
      </Link>
    </div>
  );
};
