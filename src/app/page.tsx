"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompt/PromptCard";
import { ChevronRight, Heart, Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { PromptRow } from "@/components/home/PromptRow";
import { StackedPromptRow } from "@/components/home/StackedPromptRow";
import { AIModelFilter } from "@/components/home/AIModelFilter";
import { ProfessionSection } from "@/components/home/ProfessionSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { GuidePackages } from "@/components/home/GuidePackages";
import { PackageGrid } from "@/components/home/PackageGrid";
import { TrendingDashboard } from "@/components/home/TrendingDashboard";
import { TopContributors } from "@/components/home/TopContributors";
import { FavouritesGrid } from "@/components/home/FavouritesGrid";
import { HomeFooter } from "@/components/home/HomeFooter";

export default function LandingPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch("/api/prompts?limit=12&sortBy=Most Purchased");
        const data = await res.json();
        if (data && Array.isArray(data.prompts)) {
          setPrompts(data.prompts);
        } else if (Array.isArray(data)) {
          setPrompts(data);
        } else {
          setPrompts([]);
        }
      } catch (error) {
        console.error("Failed to fetch prompts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  // Mock data for new sections
  const imageTransformPrompts = prompts.length > 0 ? prompts.slice(0, 5) : Array(5).fill({ 
    title: "Realistic Portrait FX", tagline: "Ultra-detailed skin and lighting", price: 299, rating: 4.8, platform: "Midjourney", seller: "Visionary" 
  });
  
  const instagramPrompts = prompts.length > 0 ? prompts.slice(0, 5) : Array(5).fill({ 
    title: "Viral Aesthetic Reel", tagline: "High-engagement visual storytelling", price: 199, rating: 4.9, platform: "Stable Diffusion", seller: "Creatorhub" 
  });
  
  const youtubePrompts = prompts.length > 0 ? prompts.slice(0, 4) : Array(4).fill({ 
    title: "Hook Gen Title Boost", tagline: "Maximum CTR title and description gen", price: 149, rating: 4.7, platform: "ChatGPT 4", seller: "TubeMaster" 
  });

  const mixedPrompts = Array(5).fill({ 
    title: "Strategic Asset Architect", tagline: "High-level content engineering", price: 249, rating: 4.8, platform: "Claude 3", seller: "Strategist" 
  }).map((p, i) => ({
    ...p,
    title: i % 2 === 0 ? "LinkedIn Growth Protocol" : "SEO Dominance Blueprint",
    tagline: i % 2 === 0 ? "LinkedIn Prompt" : "SEO Prompt",
  }));

  const softwareDevPrompts = Array(4).fill({ 
    title: "Bug Sniper Pro", tagline: "Advanced debugging and logic fixes", price: 349, rating: 4.9, platform: "GitHub Copilot", seller: "DevOpsElite" 
  });

  return (
    <div className="flex flex-col gap-24 pb-24 pt-24">
      {/* Row Sections */}
      <PromptRow 
        title="Image Transformation" 
        prompts={imageTransformPrompts} 
        href="/explore" 
      />

      <PromptRow 
        title={
          <>
            <Instagram size={24} className="text-primary" /> Instagram Prompts
          </>
        } 
        subtitle={["Reel", "AI Avatar", "Post"]} 
        prompts={instagramPrompts} 
        href="/explore" 
        aspectRatio="aspect-[9/16]"
        isVideo={true}
      />

      <AIModelFilter />

      <PromptRow 
        title={
          <>
            <Youtube size={24} className="text-primary" /> YouTube Content Forge
          </>
        } 
        prompts={youtubePrompts} 
        href="/explore" 
        aspectRatio="aspect-video"
        isVideo={true}
      />

      <StackedPromptRow 
        title="Professional Templates" 
        prompts={mixedPrompts} 
        href="/explore" 
      />

      <ProfessionSection />

      <PromptRow 
        title="Software Development Prompts" 
        prompts={softwareDevPrompts} 
        href="/explore" 
        isCode={true}
      />

      <CategoryGrid />

      <GuidePackages />

      <PackageGrid />

      <TrendingDashboard prompts={prompts} />

      <TopContributors />

      {/* Favourites Section */}
      <div className="space-y-12">
        <section className="container mx-auto px-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-black tracking-tight text-foreground flex items-center gap-4">
              Favourites <Heart size={24} className="text-primary fill-primary/20 animate-pulse" />
            </h2>
            <div className="h-1 w-12 bg-primary rounded-full opacity-50" />
          </div>
          <p className="text-muted-foreground font-medium text-sm">Your personally architected preference collection.</p>
        </section>

        {loading ? (
          <div className="container mx-auto px-6 h-64 bg-secondary animate-pulse rounded-3xl" />
        ) : (
          <FavouritesGrid prompts={prompts} />
        )}
      </div>

      {/* Simplified CTA & New HomeFooter */}
      <section className="container mx-auto px-6 max-w-5xl mt-12 bg-card/10 backdrop-blur-md p-1 rounded-[2.5rem] border border-border/10 overflow-hidden">
        <div className="bg-card/40 backdrop-blur-md p-8 md:p-12 text-center md:text-left rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight">Ready to Engineer <span className="text-primary">the Future?</span></h2>
            <p className="text-muted-foreground font-bold tracking-tight text-[11px] uppercase mt-2">Join elite creators & monetize your prompt architectures.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/explore">
              <Button size="lg" className="rounded-2xl px-10">
                Explore All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
