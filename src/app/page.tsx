"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { PromptRow } from "@/components/home/PromptRow";
import { StackedPromptRow } from "@/components/home/StackedPromptRow";
import { AIModelFilter } from "@/components/home/AIModelFilter";
import { ProfessionSection } from "@/components/home/ProfessionSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
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

  // Mock data for structured sections
  const imageTransformPrompts = prompts.length >= 12 ? prompts.slice(0, 12) : Array(12).fill({ 
    title: "Realistic Portrait FX", tagline: "Ultra-detailed skin and lighting", price: 299, rating: 4.8, platform: "Midjourney", seller: "Visionary" 
  }).map((p, i) => ({ ...p, title: `${p.title} v${i + 1}` }));
  
  const instagramPrompts = prompts.length >= 12 ? [...prompts].reverse().slice(0, 12) : Array(12).fill({ 
    title: "Viral Aesthetic Reel", tagline: "High-engagement visual storytelling", price: 199, rating: 4.9, platform: "Stable Diffusion", seller: "Creatorhub" 
  }).map((p, i) => ({ ...p, title: `${p.title} v${i + 1}` }));
  
  const youtubePrompts = prompts.length >= 12 ? [...prompts].sort(() => 0.5 - Math.random()).slice(0, 12) : Array(12).fill({ 
    title: "Hook Gen Title Boost", tagline: "Maximum CTR title and description gen", price: 149, rating: 4.7, platform: "ChatGPT 4", seller: "TubeMaster" 
  }).map((p, i) => ({ ...p, title: `${p.title} v${i + 1}` }));

  const mixedPrompts = Array(12).fill({ 
    title: "Strategic Asset Architect", tagline: "High-level content engineering", price: 249, rating: 4.8, platform: "Claude 3", seller: "Strategist" 
  }).map((p, i) => ({
    ...p,
    title: i % 2 === 0 ? "LinkedIn Growth Protocol" : "SEO Dominance Blueprint",
    tagline: i % 2 === 0 ? "LinkedIn Prompt" : "SEO Prompt",
  }));

  const softwareDevPrompts = Array(12).fill({ 
    title: "Bug Sniper Pro", tagline: "Advanced debugging and logic fixes", price: 349, rating: 4.9, platform: "GitHub Copilot", seller: "DevOpsElite" 
  });

  return (
    <div className="w-full min-h-screen bg-background overflow-x-hidden pb-16 flex flex-col gap-16 max-w-[1920px] mx-auto">
      
      {/* PAGE 1 CONTENT */}
      <div className="w-full flex flex-col gap-10 lg:gap-14 py-4">
        
        <PromptRow 
          title="Image Transformation Prompts" 
          prompts={imageTransformPrompts} 
          href="/explore" 
          aspectRatio="aspect-[9/16]" 
          compact={true}
        />

        <PromptRow 
          title={<span className="flex items-center gap-2"><Instagram size={24} className="text-primary" /> Instagram Prompts</span>} 
          subtitle={["Reel", "AI Avatar", "Post"]} 
          prompts={instagramPrompts} 
          href="/explore" 
          aspectRatio="aspect-[9/16]"
          isVideo={true}
          compact={true}
        />

      </div>

      <div className="h-px bg-border/20 w-full" />

      {/* PAGE 2 CONTENT */}
      <div className="w-full flex flex-col gap-14">
        <div className="container mx-auto">
          <AIModelFilter />
        </div>

        <PromptRow 
          title="Youtube Prompts" 
          prompts={youtubePrompts} 
          href="/explore" 
          aspectRatio="aspect-video"
          isVideo={true}
        />

        <StackedPromptRow title="" prompts={mixedPrompts} href="/explore" />

        <div className="w-full px-6 lg:px-12">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground/80 font-mono mb-6">
            Based on Your Profession and Interest
          </h3>
          <PromptRow 
            title="Software Development Prompts" 
            prompts={softwareDevPrompts} 
            href="/explore" 
            aspectRatio="aspect-video"
            isCode={true}
          />
        </div>
      </div>

      <div className="h-px bg-border/20 w-full" />

      {/* PAGE 3 CONTENT */}
      <div className="w-full flex flex-col gap-14">
        <ProfessionSection />
        <CategoryGrid />
        <PackageGrid />
      </div>

      <div className="h-px bg-border/20 w-full" />

      {/* PAGE 4 CONTENT */}
      <div className="w-full">
        <TrendingDashboard prompts={prompts} />
      </div>

      <div className="h-px bg-border/20 w-full" />

      {/* PAGE 5 CONTENT */}
      <div className="w-full flex flex-col gap-14 pt-4">
        <TopContributors />
        
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="flex flex-col items-start gap-2 mb-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight flex items-center gap-3">
              Favourites <Heart className="text-primary fill-primary/20" size={28} />
            </h2>
            <div className="h-1 w-16 bg-primary rounded-full opacity-50" />
            <p className="text-muted-foreground font-medium text-sm mt-2">Most liked prompts curated by the community.</p>
          </div>
          
          {loading ? (
            <div className="w-full h-64 bg-secondary animate-pulse rounded-2xl" />
          ) : (
            <FavouritesGrid prompts={prompts} />
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="pt-20">
        <HomeFooter />
      </div>
      
    </div>
  );
}
