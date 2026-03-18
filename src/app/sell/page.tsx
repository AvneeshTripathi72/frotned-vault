"use client";

import { SellPromptForm } from "@/components/prompt/SellPromptDialog";
import { BrainCircuit } from "lucide-react";

export default function SellPromptPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-black tracking-tighter leading-none">
            Architect Your <span className="text-gradient">Logic</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-xl mx-auto">
            Convert your engineering brilliance into an automated income stream.
          </p>
        </div>

        <div className="glass-card p-10 rounded-[2.5rem] border-border/40 bg-card shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
           <SellPromptForm />
        </div>
      </div>
    </div>
  );
}
