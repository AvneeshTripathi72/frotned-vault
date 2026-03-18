"use client";

import { Badge } from "@/components/ui/badge";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="aspect-[16/9] w-full rounded-[3rem] overflow-hidden bg-secondary dark:bg-muted relative border border-border/40 dark:border-white/5 shadow-xl group">
        {images?.[0] ? (
          <img src={images[0]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt="Main Preview" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary dark:bg-muted">
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30">No Preview Available</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        <div className="absolute bottom-10 left-10">
          <Badge className="bg-card/80 backdrop-blur-xl border-border/40 text-primary font-black tracking-[0.2em] text-[10px] px-6 py-2 rounded-2xl uppercase">High Definition Preview</Badge>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {images?.map((img: string, i: number) => (
          <div key={i} className="aspect-square rounded-[2rem] overflow-hidden bg-secondary dark:bg-muted cursor-pointer hover:ring-4 ring-primary/30 transition-all border border-border/40 dark:border-white/5 shadow-md group">
            <img src={img || ""} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`Preview ${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
