"use client";

import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export const HomeFooter = () => {
  const columns = [
    { title: "Categories", links: ["Writing", "Coding", "Image", "Video", "Research"] },
    { title: "Use Cases", links: ["LinkedIn Hacks", "Resume Writing", "Startup Ideas", "Debug Code"] },
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
    <footer className="mt-24 pt-16 border-t border-white/10 bg-[#050505] relative z-10">
      <div className="container mx-auto px-6 pb-16 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-16">
          {/* Brand */}
          <div className="lg:w-1/3 space-y-6">
            <h2 className="text-3xl font-black tracking-tighter text-white">
              Vault<span className="text-primary">.</span>
            </h2>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm">
              The premier marketplace for top-tier prompts. Discover, buy, and sell expert AI instructions engineered for peak performance.
            </p>
            <div className="flex items-center gap-4 pt-2">
               <Github className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
               <Twitter className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
               <Linkedin className="w-5 h-5 text-white/40 hover:text-white transition-colors cursor-pointer" />
            </div>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2 pt-6 lg:max-w-xs">
              {seoLinks.map((link) => (
                <Link 
                  key={link} 
                  href="#" 
                  className="text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors"
                >
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Empty Space for Grid alignment */}
          <div className="lg:w-2/3 flex flex-wrap lg:justify-end gap-12 md:gap-24">
            {columns.map((col) => (
               <div key={col.title} className="space-y-6">
                 <h4 className="text-[11px] font-bold text-white/90 tracking-[0.2em] uppercase">{col.title}</h4>
                 <div className="flex flex-col gap-4">
                   {col.links.map((link) => (
                     <Link key={link} href="#" className="text-[13px] font-medium text-white/50 hover:text-white transition-colors">
                       {link}
                     </Link>
                   ))}
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/5 bg-[#030303]">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-[11px] font-bold uppercase tracking-widest text-white/40">
             {["About", "Contact", "Privacy", "Terms"].map((link) => (
                <Link key={link} href="#" className="hover:text-white transition-colors">{link}</Link>
             ))}
           </div>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/30">
                © {new Date().getFullYear()} Vault Systems — All Operational
             </p>
           </div>
        </div>
      </div>
    </footer>
  );
};
