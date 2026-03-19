"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Wallet, Menu, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { SearchControl } from "./navbar/SearchControl";
import { UserProfile } from "./navbar/UserProfile";
import { MobileNav } from "./navbar/MobileNav";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [balance, setBalance] = useState<number>(0);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) {
        if (res.status === 401) {
          setUser(null);
          setBalance(0);
        }
        return;
      }
      const data = await res.json();
      if (data) {
        setUser(data);
        if (typeof data.coins === "number") setBalance(data.coins);
      }
    } catch (e: any) {
      setUser(null);
      setBalance(0);
    }
  };

  useEffect(() => {
    setIsLoggedIn(document.cookie.includes("vault_username"));
    fetchProfile();
    
    const handleUpdate = () => fetchProfile();
    window.addEventListener("balanceUpdate", handleUpdate);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("balanceUpdate", handleUpdate);
    };
  }, []);

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "vault_username=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setUser(null);
    setBalance(0);
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  if (pathname === "/auth") return null;

  return (
    <>
      <nav className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled ? "bg-white/80 dark:bg-[#0B0B0F]/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      )}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between gap-8">
          <div className="flex items-center gap-6 lg:gap-12">
            <Link href="/" className="text-xl font-black tracking-tighter flex items-center gap-2">
              <span className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white shadow-lg shadow-primary/20">P</span>
              <span className="hidden sm:inline-block">Vault<span className="text-primary italic">.</span></span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/explore" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Explore</Link>
              <Link href="/sell" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Add Prompt</Link>
              <Link href="/dashboard" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
              <Link href="/purchases" className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">Purchases</Link>
            </div>
          </div>

          <SearchControl />

          <div className="flex items-center gap-2">
            <Link href="/wallet" className="hidden sm:flex items-center gap-2 hover:bg-muted p-1.5 px-3 rounded-lg border border-border/40 transition-all">
              <Wallet className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold">{balance}</span>
            </Link>

            <div className="flex items-center gap-2">
              {mounted && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-muted-foreground hover:text-primary transition-colors h-10 w-10 rounded-lg hover:bg-muted"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              )}
              
              <div className="h-4 w-px bg-border/40 mx-1 hidden sm:block" />

              {mounted && (
                <UserProfile 
                  user={user} 
                  balance={balance} 
                  isLoggedIn={isLoggedIn} 
                  handleLogout={handleLogout} 
                  onSignIn={() => router.push("/auth")} 
                />
              )}
              
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <MobileNav 
        open={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        pathname={pathname} 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout} 
        onSignIn={() => router.push("/auth")} 
      />
    </>
  );
};
