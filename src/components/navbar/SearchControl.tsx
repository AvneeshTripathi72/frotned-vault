"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchControl() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/explore?q=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="flex-1 max-w-md hidden md:flex relative group">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
      <Input 
        placeholder="Search assets..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleSearch}
        suppressHydrationWarning
        className="pl-10 h-10 bg-white dark:bg-[#181824] border-border rounded-xl focus:ring-primary/20 focus:border-primary transition-all text-sm font-medium"
      />
    </div>
  );
}
