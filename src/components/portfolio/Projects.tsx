"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "File Upload & Management System",
    description: "Robust, secure backend API enabling efficient high-volume file transfers and management for enterprise users.",
    tech: ["React", "Spring Boot", "PostgreSQL", "Tailwind"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "Course Selling App",
    description: "Complete e-learning marketplace complete with authentication, payment gateways, and real-time dashboard analytics.",
    tech: ["Node.js", "Express", "MongoDB", "React"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "Movie Booking System",
    description: "Full-stack seat reservation portal supporting real-time seat locking, interactive UI, and ticket PDF generation.",
    tech: ["Next.js", "Django", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop",
    github: "#",
    live: "#",
  }
];

export const Projects = () => {
  return (
    <section className="py-24 bg-[#0a0a0a] border-t border-zinc-800 relative z-10 text-white">
      <div className="container mx-auto px-6 max-w-6xl space-y-16">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <span className="text-[#00ff9f] font-mono text-sm tracking-widest uppercase">My Work</span>
          <h2 className="text-4xl md:text-5xl font-black">Featured Projects</h2>
          <div className="w-16 h-1 bg-[#ff69b4] rounded-full" />
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="bg-[#111] rounded-2xl border border-zinc-800 overflow-hidden group hover:border-[#ff69b4]/50 hover:shadow-[0_0_40px_rgba(255,105,180,0.15)] transition-all flex flex-col"
            >
              {/* Image Section */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <div className="absolute inset-0 bg-[#00ff9f]/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 md:p-8 flex flex-col flex-grow space-y-4">
                <div className="flex gap-2 flex-wrap mb-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest font-mono text-[#00ff9f] bg-[#00ff9f]/10 px-2.5 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-black text-zinc-100 group-hover:text-white transition-colors">{project.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>

                <div className="flex items-center gap-4 pt-4 mt-auto border-t border-zinc-900">
                  <a href={project.github} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ff69b4] hover:text-white transition-colors">
                    <FolderGit2 className="w-4 h-4" /> Repo
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#00ff9f] hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
