"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Share2, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface PurchaseSidebarProps {
  price: number;
  isPurchased: boolean;
  handlePurchase: () => void;
  seller: any;
}

export function PurchaseSidebar({ price, isPurchased, handlePurchase, seller }: PurchaseSidebarProps) {
  const sellerData = typeof seller === 'object' ? seller : { username: seller };
  const username = sellerData.username || sellerData.name || "anonymous";
  const avatar = sellerData.avatar || `https://avatar.iran.liara.run/public/boy?username=${username}`;

  return (
    <aside className="space-y-10">
      <Card className="glass-card p-10 rounded-[3rem] sticky top-28 border-border/40 space-y-10 shadow-xl bg-card">
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">Investment Required</span>
          <div className="flex items-end gap-3 text-6xl font-black text-primary tracking-tighter">
            {price}<span className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground pb-2">CR</span>
          </div>
        </div>

        <div className="space-y-4">
          {!isPurchased ? (
            <Button className="w-full h-13 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-primary text-white hover:opacity-90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]" onClick={handlePurchase}>
              Acquire Logic
            </Button>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              <Button className="w-full h-13 rounded-2xl bg-secondary border border-border/40 hover:bg-primary hover:text-white transition-all font-black uppercase tracking-widest text-[9px]">
                <Download className="w-4 h-4 mr-2" /> Download Source
              </Button>
              <Button className="w-full h-13 rounded-2xl bg-secondary border border-border/40 hover:bg-muted transition-all font-black uppercase tracking-widest text-[9px]">
                <Share2 className="w-4 h-4 mr-2" /> Distribute
              </Button>
            </div>
          )}
          <Button variant="outline" className="w-full h-13 rounded-2xl border-border/40 bg-secondary hover:bg-muted transition-all font-black uppercase tracking-widest text-[9px]">
            <Heart className="w-4 h-4 mr-2" /> Save to Vault
          </Button>
        </div>

        <div className="border-t border-border/40 pt-10 space-y-8">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary/20 p-0.5 shadow-md relative group">
              <img src={avatar} alt="Seller" className="w-full h-full object-cover rounded-[calc(1rem-2.5px)] relative z-10" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black text-xl tracking-tight text-foreground">@{username}</h4>
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] font-black tracking-widest">MASTER</Badge>
              </div>
            </div>
          </div>
          <Link href={`/u/${username}`} className="w-full">
            <Button variant="outline" className="w-full h-12 border border-border/40 rounded-xl hover:border-primary/30 transition-all font-black uppercase tracking-widest text-[10px]">Engineer Profile</Button>
          </Link>
        </div>

        <div className="space-y-4 bg-primary/5 p-6 rounded-[2rem] border border-primary/10">
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.15em] text-primary">
            <ShieldCheck className="w-4 h-4" /> Secure Channel
          </div>
        </div>
      </Card>
    </aside>
  );
}
