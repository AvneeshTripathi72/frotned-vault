"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { notFound } from "next/navigation";
import { PromptHeader } from "./components/PromptHeader";
import { ImageGallery } from "./components/ImageGallery";
import { LogicEngine } from "./components/LogicEngine";
import { PurchaseSidebar } from "./components/PurchaseSidebar";

export default function PromptDetailPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const params = React.use(paramsPromise);
  const [prompt, setPrompt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const res = await fetch(`/api/prompts/${params.id}`);
        if (!res.ok) throw new Error("Prompt not found");
        const data = await res.json();
        setPrompt(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrompt();
  }, [params.id]);

  if (loading) return <div className="flex items-center justify-center min-h-[70vh]"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  if (!prompt) return notFound();

  const handlePurchase = async () => {
    try {
      const res = await fetch("/api/prompts/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: params.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Purchase failed");
      setIsPurchased(true);
      toast.success(data.message);
      window.dispatchEvent(new Event("balanceUpdate"));
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto px-6 py-16 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          <PromptHeader platform={prompt.platform} category={prompt.category} title={prompt.title} tagline={prompt.tagline} />
          <ImageGallery images={prompt.images} />
          <LogicEngine isPurchased={isPurchased} promptText={prompt.promptText} price={prompt.price} handlePurchase={handlePurchase} />

          <div className="space-y-10">
            <h2 className="text-3xl font-black tracking-tight">Trust & Feedback</h2>
            <div className="flex flex-col items-center justify-center p-20 rounded-[3rem] border border-dashed border-border/40 bg-muted/20 text-center space-y-4">
              <div className="w-16 h-16 bg-muted/50 rounded-2xl flex items-center justify-center"><Star className="w-8 h-8 text-muted-foreground/30" /></div>
              <div className="space-y-1">
                <p className="font-bold text-foreground">No reviews yet</p>
                <p className="text-sm text-muted-foreground">Be the first to share your experience.</p>
              </div>
            </div>
          </div>
        </div>

        <PurchaseSidebar price={prompt.price} isPurchased={isPurchased} handlePurchase={handlePurchase} seller={prompt.seller} />
      </div>
      
      {!isPurchased && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-6 bg-background/95 backdrop-blur-2xl border-t border-border/40 z-50 shadow-2xl">
          <Button className="w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest bg-primary text-white" onClick={handlePurchase}>
            Unlock Engineering • {prompt.price} Coins
          </Button>
        </div>
      )}
    </div>
  );
}
