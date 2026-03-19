"use client";

import Link from "next/link";

export const HomeFooter = () => {
  const columns = [
    { title: "Categories", links: ["Writing", "Coding", "Image", "Video", "Research"] },
    { title: "Use Cases", links: ["LinkedIn Posts", "Resume Writing", "Startup Ideas", "Debug Code"] },
    { title: "Browse by AI", links: ["GPT-4", "Claude", "Gemini", "Midjourney"] },
    { title: "Discovery", links: ["Trending", "Top Rated", "New Prompts", "Collections"] },
    { title: "Creators", links: ["Upload Prompt", "Dashboard", "Monetize", "Guidelines"] },
  ];

  const seoLinks = [
    "Best prompts for LinkedIn",
    "Best prompts for coding",
    "Best AI prompts",
    "Free ChatGPT prompts"
  ];

  return (
    <footer className="w-full bg-background pt-16 pb-8 border-t border-border/40 shrink-0 mt-8">
      <div className="w-full px-6 md:px-12 lg:px-24 flex flex-col gap-12 max-w-[1920px] mx-auto">
        
        {/* Top: 5 Columns of Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {columns.map((col) => (
             <div key={col.title} className="space-y-5">
               <h4 className="text-xs font-black text-foreground/90 tracking-widest uppercase">{col.title}</h4>
               <div className="flex flex-col gap-3">
                 {col.links.map((link) => (
                   <Link key={link} href="#" className="text-[13px] font-medium text-muted-foreground hover:text-primary transition-colors">
                     {link}
                   </Link>
                 ))}
               </div>
             </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-border/40" />

        {/* Middle: SEO Links & Secondary Info */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/50 hidden md:block">Top Searches:</span>
          {seoLinks.map((link) => (
            <Link 
              key={link} 
              href="#" 
              className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Bottom: Brand & Legal Links */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-6">
          <h1 className="text-6xl md:text-[6rem] lg:text-[7rem] font-black tracking-tighter leading-none text-foreground">
            NORAG
          </h1>
          
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 gap-y-4">
            {["About", "Contact", "Privacy", "Terms"].map((link) => (
               <Link 
                 key={link} 
                 href="#" 
                 className="text-[11px] font-bold tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors uppercase"
               >
                 {link}
               </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
