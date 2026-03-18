"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin, ExternalLink } from "lucide-react";

export const HomeFooter = () => {
  const columns = [
    { title: "Categories", links: ["Writing", "Coding", "Image", "Video", "Research"] },
    { title: "Use Cases", links: ["LinkedIn Hacks", "Resume Writing", "Startup Ideas", "Debug Code"] },
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
    <footer className="mt-24 pt-24 pb-12 border-t border-border/40 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Main Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-20">
          {columns.map((col) => (
            <div key={col.title} className="space-y-6">
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-foreground opacity-80">{col.title}</h4>
              <div className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <Link 
                    key={link} 
                    href="#" 
                    className="text-muted-foreground hover:text-primary text-xs font-bold transition-all duration-300 hover:translate-x-1"
                  >
                    {link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SEO Link Bar */}
        <div className="py-8 border-y border-border/20 mb-12 flex flex-wrap justify-center gap-x-12 gap-y-4">
          {seoLinks.map((link) => (
            <Link 
              key={link} 
              href="#" 
              className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/40 hover:text-primary transition-colors hover:scale-105"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-12">
          <div className="flex flex-col gap-2">
            <h2 className="text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.8] text-foreground/5 pointer-events-none select-none -ml-4 md:-ml-8 uppercase">NORAG</h2>
            <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
               <span className="w-6 h-px bg-primary" />
               Architecting Intelligence v1.0
            </div>
          </div>

          <div className="flex flex-col md:items-end gap-6 w-full md:w-auto">
            <div className="flex flex-wrap gap-8">
              {["About", "Contact", "Privacy", "Terms"].map((link) => (
                <Link 
                  key={link} 
                  href="#" 
                  className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4 text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">
               © {new Date().getFullYear()} PROMPT_VAULT_ENGINEERING — ALL_SYSTEMS_GO
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full -mb-[200px] -mr-[200px] pointer-events-none" />
    </footer>
  );
};
