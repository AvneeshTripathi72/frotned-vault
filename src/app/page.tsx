"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap, Shield, Wallet, Star, Flame, Trophy, Users, Search } from "lucide-react";
import { TrendingSlider } from "@/components/prompt/TrendingSlider";
import { Footer } from "@/components/Footer";
import { useEffect, useState } from "react";
import { PromptCard } from "@/components/prompt/PromptCard";

export default function LandingPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const res = await fetch("/api/prompts?limit=8&sortBy=Most Purchased");
        const data = await res.json();
        setPrompts(data.prompts || data || []);
      } catch (error) {
        console.error("Failed to fetch prompts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompts();
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-6 h-6 text-primary" />,
      title: "Premium Architectures",
      description: "Access high-performance prompts designed for GPT-4, Midjourney, and Claude."
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Verified Excellence",
      description: "Every prompt is tested and verified by our elite engineering team."
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Instant Integration",
      description: "Copy-paste ready logic that integrates seamlessly into your workflow."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Badge variant="outline" className="px-4 py-1.5 rounded-full border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest">
                <Star className="w-3 h-3 mr-2 fill-primary" />
                The Future of Prompt Engineering
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85] text-foreground">
                MASTER THE <br />
                <span className="text-primary italic">ARTIFICIAL</span>
              </h1>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto leading-relaxed">
                The world's most sophisticated prompt marketplace. Built for engineers, by engineers.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Link href="/explore">
                <Button size="lg" className="h-14 px-8 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/sell">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl border-border hover:bg-secondary font-bold text-lg">
                  Start Selling
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-8 pt-8 text-sm font-bold text-muted-foreground/60 uppercase tracking-widest"
            >
              <div className="flex items-center gap-2"><Trophy className="w-4 h-4" /> 50k+ Sales</div>
              <div className="flex items-center gap-2"><Users className="w-4 h-4" /> 12k Creators</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> 100% Secure</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-tighter">
                <Flame className="w-5 h-5 fill-primary" /> Trending Now
              </div>
              <h2 className="text-4xl font-black">Elite Collections</h2>
            </div>
            <Link href="/explore" className="text-primary font-bold flex items-center gap-1 hover:underline">
              View Marketplace <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="max-w-[1400px] mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-[400px] rounded-[2rem] bg-secondary animate-pulse border border-border/40" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {prompts.slice(0, 4).map((p) => (
                  <PromptCard 
                    key={p._id} 
                    id={p._id}
                    title={p.title}
                    tagline={p.tagline}
                    short_description={p.short_description}
                    price={p.price}
                    rating={p.rating}
                    platform={p.platform}
                    author={p.author || { username: p.seller || 'anonymous', avatar: '' }}
                    previewImage={p.previewImage || (p.images && p.images[0])}
                    promptPreview={p.promptPreview || p.prompt}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="space-y-4 p-8 rounded-[2.5rem] bg-card border border-border/40 hover:border-primary/40 transition-colors">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="relative overflow-hidden bg-foreground text-background p-12 md:p-20 rounded-[3rem] text-center space-y-8">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Sparkles className="w-64 h-64" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl mx-auto">
            READY TO ENGINEER THE <span className="text-primary italic">FUTURE?</span>
          </h2>
          <p className="text-lg text-background/60 font-medium max-w-xl mx-auto">
            Join the elite circle of prompt engineers and start monetizing your architectural genius today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/sell">
              <Button size="lg" className="h-14 px-10 rounded-2xl bg-primary text-primary-foreground font-black text-lg">
                Become a Seller
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="h-14 px-10 rounded-2xl border-background/20 bg-background/10 hover:bg-background/20 font-black text-lg text-background">
                Explore All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
