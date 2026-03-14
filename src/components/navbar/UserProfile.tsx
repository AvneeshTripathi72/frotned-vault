"use client";

import Link from "next/link";
import { User, Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserProfileProps {
  user: any;
  balance: number;
  handleLogout: () => void;
  isLoggedIn: boolean;
  onSignIn: () => void;
}

export function UserProfile({ user, balance, handleLogout, isLoggedIn, onSignIn }: UserProfileProps) {
  const [avatarError, setAvatarError] = useState(false);

  if (!isLoggedIn) {
    return (
      <Button 
        onClick={onSignIn}
        size="sm" 
        className="rounded-lg px-5 h-10 bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all font-bold text-xs uppercase tracking-widest"
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="hidden sm:flex flex-col items-end gap-0.5">
            <span className="text-[11px] font-black tracking-tight text-foreground group-hover:text-primary transition-colors uppercase">
              {user?.username || (user?.email ? user.email.split('@')[0] : 'User')}
            </span>
            <div className="flex items-center gap-1.5 bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20 transition-all group-hover:bg-primary group-hover:border-primary">
              <span className="text-[9px] font-black text-primary group-hover:text-white uppercase tracking-widest">₹{balance}</span>
            </div>
          </div>
          
          <div className="h-10 w-10 overflow-hidden rounded-xl border-2 border-border/40 group-hover:border-primary transition-all shadow-xl shadow-black/10 bg-muted/20 flex shrink-0">
            {user?.avatar && !avatarError ? (
              <img 
                src={user.avatar} 
                className="w-full h-full object-cover" 
                alt=""
                onError={() => setAvatarError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary text-white font-black text-xl shadow-inner uppercase">
                {(user?.username?.[0] || user?.email?.[0] || 'U')}
              </div>
            )}
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background/95 backdrop-blur-xl border-border/40 p-2 rounded-2xl shadow-2xl z-[100]">
        <DropdownMenuLabel className="font-black text-xs uppercase tracking-widest opacity-60 px-3 py-3">Account_Nexus</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border/20 mx-1" />
        <DropdownMenuItem asChild className="rounded-xl transition-all hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
          <Link href="/profile" className="flex items-center gap-3 px-3 py-2.5">
            <User className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">View Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="rounded-xl transition-all hover:bg-primary/10 focus:bg-primary/10 cursor-pointer">
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5">
            <Settings className="w-4 h-4 text-muted-foreground" />
            <span className="font-bold text-sm">Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border/20 mx-1" />
        <DropdownMenuItem 
          className="rounded-xl transition-all text-destructive hover:bg-destructive/10 focus:bg-destructive/10 cursor-pointer px-3 py-2.5"
          onClick={handleLogout}
        >
          <div className="flex items-center gap-3 w-full">
            <LogOut className="w-4 h-4" />
             <span className="font-black uppercase tracking-[0.2em] text-[10px]">Logout Account</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
