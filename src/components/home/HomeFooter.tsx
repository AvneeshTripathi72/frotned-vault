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
      <div className="w-full px-6 md:px-12 lg:px-24 space-y-16 max-w-none">
        
        {/* Top: 5 Columns of Links */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {columns.map((col) => (
             <div key={col.title} className="space-y-4">
               <h4 className="text-[11px] font-bold text-foreground/80 tracking-[0.05em] uppercase">{col.title}</h4>
               <div className="flex flex-col gap-3">
                 {col.links.map((link) => (
                   <Link key={link} href="#" className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                     {link}
                   </Link>
                 ))}
               </div>
             </div>
          ))}
        </div>

        {/* Middle: SEO Links */}
        <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
          {seoLinks.map((link) => (
            <Link 
              key={link} 
              href="#" 
              className="text-xs md:text-sm font-semibold text-muted-foreground/80 hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Bottom: Massive Brand & Legal Links */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12 pt-8">
          <h1 className="text-6xl md:text-[8rem] lg:text-[12rem] font-black tracking-tighter leading-none text-foreground">
            NORAG
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 pb-2 lg:pb-8">
            {["About", "Contact", "Privacy", "Terms"].map((link) => (
               <Link 
                 key={link} 
                 href="#" 
                 className="text-xs md:text-sm font-bold tracking-wide text-muted-foreground hover:text-foreground transition-colors uppercase"
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
