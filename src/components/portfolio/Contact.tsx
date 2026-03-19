"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Linkedin } from "lucide-react";

export const Contact = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-zinc-800 text-white relative z-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row gap-16"
        >
          {/* Info Side */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-[#00ff9f] font-mono text-sm tracking-widest uppercase">Get in touch</span>
              <h2 className="text-4xl md:text-5xl font-black">Let's Connect</h2>
              <div className="w-16 h-1 bg-[#ff69b4] rounded-full" />
              <p className="text-zinc-400 leading-relaxed text-sm pt-4">
                Looking to build a next-gen application or need high-end video content? Drop me a message and let's discuss your project.
              </p>
            </div>

            <div className="space-y-6 pt-4">
              <a href="mailto:hello@example.com" className="flex items-center gap-4 group">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-[#00ff9f] transition-all">
                  <Mail className="text-[#00ff9f] w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono text-zinc-500">Email</p>
                  <p className="text-white font-bold group-hover:text-[#00ff9f] transition-colors">hello@example.com</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 group">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-[#ff69b4] transition-all">
                  <Phone className="text-[#ff69b4] w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono text-zinc-500">Phone</p>
                  <p className="text-white font-bold group-hover:text-[#ff69b4] transition-colors">+91 99999 99999</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-4 group">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-[#00ff9f] transition-all">
                  <Linkedin className="text-[#00ff9f] w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-mono text-zinc-500">Network</p>
                  <p className="text-white font-bold group-hover:text-[#00ff9f] transition-colors">Avneesh Kumar Tripathi</p>
                </div>
              </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-1/2 rounded-3xl bg-zinc-900 border border-zinc-800 p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff69b4]/10 blur-[50px] pointer-events-none" />
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-[#00ff9f]">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00ff9f] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-[#ff69b4]">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ff69b4] transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-widest text-zinc-400">Message</label>
                <textarea 
                  rows={4}
                  className="w-full bg-black/50 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button type="submit" className="w-full px-8 py-4 rounded-xl bg-[#00ff9f] text-black font-black uppercase tracking-widest text-sm hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(0,255,159,0.3)] transition-all duration-300">
                Send Message
              </button>
            </form>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
