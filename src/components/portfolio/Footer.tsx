import { Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 bg-[#0d0d0d] border-t border-zinc-900 text-center relative z-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-zinc-500 font-mono text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Avneesh Kumar Tripathi. All rights reserved.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-zinc-500 hover:text-[#00ff9f] transition-colors">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="text-zinc-500 hover:text-[#ff69b4] transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-zinc-500 hover:text-[#00ff9f] transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
