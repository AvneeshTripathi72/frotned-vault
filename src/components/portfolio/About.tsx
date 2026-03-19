"use client";

import { motion } from "framer-motion";

const skills = [
  "HTML", "CSS", "JavaScript", "React", "Node.js", "Django", "Spring Boot", "MongoDB"
];

export const About = () => {
  return (
    <section className="py-24 bg-[#0d0d0d] border-t border-zinc-800">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-16 items-center"
        >
          {/* Text Section */}
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              About <span className="text-[#00ff9f]">Me</span>
            </h2>
            <div className="h-1 w-20 bg-[#ff69b4] rounded-full" />
            <p className="text-zinc-400 leading-relaxed text-lg">
              Hello! I'm Avneesh Kumar Tripathi, a passionate developer who loves manipulating code to build clean, efficient, and beautifully animated user interfaces. My journey bridges the gap between structured backend systems and mesmerizing frontend aesthetics.
            </p>
            <p className="text-zinc-400 leading-relaxed text-lg">
              When I'm not writing code, I'm deep diving into video editing to craft compelling digital narratives. Let's build something extraordinary.
            </p>
          </div>

          {/* Skills Section */}
          <div className="md:w-1/2 w-full place-items-center">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1, translateY: -5 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#00ff9f] hover:shadow-[0_0_20px_rgba(0,255,159,0.2)] transition-all cursor-default"
                >
                  <span className="text-white text-xs font-black uppercase tracking-widest">{skill}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
