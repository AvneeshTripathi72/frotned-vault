"use client";

import Link from "next/link";
import { X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
  isLoggedIn: boolean;
  handleLogout: () => void;
  onSignIn: () => void;
}

export function MobileNav({ open, onClose, pathname, isLoggedIn, handleLogout, onSignIn }: MobileNavProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <nav className="absolute top-0 left-0 bottom-0 w-80 bg-background border-r border-border/40 p-8 flex flex-col gap-8 shadow-2xl animate-in slide-in-from-left duration-300">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-2">
            <span className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">P</span>
            <span className="text-foreground">Vault<span className="text-primary italic">.</span></span>
          </Link>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-foreground" />
          </Button>
        </div>
        
        <div className="flex flex-col gap-2">
          {[
            { label: "Home", href: "/" },
            { label: "Explore", href: "/explore" },
            { label: "Add Prompt", href: "/sell" },
            { label: "Dashboard", href: "/dashboard" },
            { label: "Purchases", href: "/purchases" },
            { label: "Wallet", href: "/wallet" },
          ].map((item) => (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "px-4 py-3 rounded-xl hover:bg-secondary font-black uppercase tracking-widest text-[10px] transition-all",
                pathname === item.href ? "text-primary bg-primary/5" : "text-muted-foreground"
              )}
              onClick={onClose}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="mt-auto space-y-4">
          {isLoggedIn ? (
            <Button 
              onClick={() => {
                handleLogout();
                onClose();
              }}
              variant="outline" 
              className="w-full h-12 rounded-xl border-destructive/20 text-destructive font-black uppercase tracking-widest text-[10px] hover:bg-destructive/5"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout Account
            </Button>
          ) : (
            <Button 
              onClick={() => {
                onSignIn();
                onClose();
              }}
              className="w-full h-12 rounded-xl bg-primary text-white font-black uppercase tracking-widest text-[10px] shadow-lg shadow-primary/20"
            >
              Sign In to Vault
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
