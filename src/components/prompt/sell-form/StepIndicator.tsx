import { BrainCircuit, ImageIcon, Layers, Cpu, CircleDollarSign, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const STEPS = [
  { id: 1, name: "Core", icon: BrainCircuit },
  { id: 2, name: "Evidence", icon: ImageIcon },
  { id: 3, name: "Classification", icon: Layers },
  { id: 4, name: "Technical", icon: Cpu },
  { id: 5, name: "Pricing", icon: CircleDollarSign },
  { id: 6, name: "Verify", icon: CheckCircle2 },
];

interface StepIndicatorProps {
  currentStep: number;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-between items-center px-2">
      {STEPS.map((s) => (
        <div key={s.id} className="flex flex-col items-center gap-2 relative">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
            currentStep >= s.id ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-muted text-muted-foreground"
          )}>
            <s.icon className="w-4 h-4" />
          </div>
          <span className={cn("text-[10px] font-bold uppercase tracking-widest", currentStep >= s.id ? "text-primary" : "text-muted-foreground/60")}>
            {s.name}
          </span>
        </div>
      ))}
    </div>
  );
}
