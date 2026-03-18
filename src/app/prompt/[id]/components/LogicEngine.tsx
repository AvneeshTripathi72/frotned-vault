"use client";

import { motion } from "framer-motion";
import { Sparkles, Lock, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface LogicEngineProps {
  isPurchased: boolean;
  promptText: string;
  price: number;
  handlePurchase: () => void;
}

export function LogicEngine({ isPurchased, promptText, price, handlePurchase }: LogicEngineProps) {
  return (
    <Card className="glass-card relative overflow-hidden rounded-[3rem] border-border/40 shadow-xl">
      <div className="p-12 space-y-10">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3 text-foreground">
              <Sparkles className="w-7 h-7 text-primary" /> Logic Engine
            </h2>
            <p className="text-xs text-muted-foreground font-medium">Verified prompt construction for optimal results</p>
          </div>
          {isPurchased && (
            <Button variant="outline" size="sm" className="h-10 rounded-xl gap-2 font-bold border-border/40 hover:bg-primary/10 hover:text-primary" onClick={() => {
              navigator.clipboard.writeText(promptText);
              toast.success("Ready to paste!");
            }}>
              <Copy className="w-4 h-4" /> Copy Instructions
            </Button>
          )}
        </div>

        <div className="relative font-mono text-sm leading-relaxed whitespace-pre-wrap rounded-[2rem] p-10 bg-secondary dark:bg-input border border-border/40 dark:border-white/5 min-h-[250px] shadow-inner">
          {!isPurchased ? (
            <div className="absolute inset-0 bg-gradient-to-t from-secondary dark:from-input via-secondary/95 dark:via-input/95 to-transparent backdrop-blur-sm flex flex-col items-center justify-center p-12 text-center gap-8">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center border border-primary/20 shadow-xl relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                <Lock className="w-10 h-10 text-primary relative z-10" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-black tracking-tighter text-foreground">Content Locked</h3>
                <p className="text-sm text-card-foreground max-w-xs font-medium leading-relaxed">Secure this logic engine to gain lifetime access.</p>
              </div>
              <Button className="rounded-[1.25rem] px-10 h-13 bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95" onClick={handlePurchase}>
                Unlock Gear for {price} Coins
              </Button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-foreground leading-relaxed text-base">
              {promptText}
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}
