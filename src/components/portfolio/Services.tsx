"use client";

import { motion } from "framer-motion";
import { Monitor, Layers, Film } from "lucide-react";

const services = [
  {
    title: "Web Development",
    desc: "Crafting beautiful, responsive, and performance-optimized websites tailored to your brand.",
    icon: Monitor,
    color: "#00ff9f",
  },
  {
    title: "Full Stack Systems",
    desc: "Architecting scalable and secure backend logic integrated flawlessly with frontend frameworks.",
    icon: Layers,
    color: "#ff69b4",
  },
  {
    title: "Video Editing",
    desc: "Producing cinematic and high-engagement short-form video content to accelerate your marketing.",
    icon: Film,
    color: "#00ff9f",
  }
];

export const Services = () => {
  return (
    <section className="py-24 bg-[#0d0d0d] border-t border-zinc-800 relative z-10 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-[#ff69b4]/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl space-y-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <span className="text-[#ff69b4] font-mono text-sm tracking-widest uppercase">Expertise</span>
          <h2 className="text-4xl md:text-5xl font-black">My Services</h2>
          <div className="w-16 h-1 bg-[#00ff9f] rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0, 255, 159, 0.1)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 hover:border-[#00ff9f]/50 transition-colors flex flex-col items-center text-center space-y-6 group"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 bg-black/50"
                style={{ borderColor: `${service.color}40`, color: service.color }}
              >
                <service.icon className="w-8 h-8 drop-shadow-[0_0_10px_currentColor]" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-black tracking-tight text-white">{service.title}</h3>
                <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
