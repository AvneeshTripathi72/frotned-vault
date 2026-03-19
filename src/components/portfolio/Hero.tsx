"use client";

import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0d0d0d] pt-20">
      {/* Background Particles/Glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ff9f]/10 blur-[120px] rounded-full mix-blend-screen" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ff69b4]/10 blur-[100px] rounded-full mix-blend-screen" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full border border-[#00ff9f]/30 bg-[#00ff9f]/10 text-[#00ff9f] text-xs font-mono tracking-widest uppercase"
          >
            Avneesh Kumar Tripathi
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-[1.1]">
            Full Stack Developer <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9f] to-[#ff69b4]">
              & Video Editor
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 font-medium max-w-2xl mx-auto">
            I build high-performance web apps and engaging video content that converts. Bridging the gap between robust engineering and creative storytelling.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <button className="px-8 py-4 rounded-xl bg-[#00ff9f] text-black font-black uppercase tracking-widest text-sm hover:scale-105 hover:shadow-[0_0_30px_rgba(0,255,159,0.4)] transition-all duration-300 w-full sm:w-auto">
              View Projects
            </button>
            <button className="px-8 py-4 rounded-xl border border-[#ff69b4] text-[#ff69b4] font-black uppercase tracking-widest text-sm hover:bg-[#ff69b4]/10 hover:shadow-[0_0_30px_rgba(255,105,180,0.3)] transition-all duration-300 w-full sm:w-auto">
              Hire Me
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
