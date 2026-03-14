"use client";

import { useState, useEffect, Suspense } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { FilterPanel } from "./components/FilterPanel";
import { PromptGrid } from "./components/PromptGrid";
import { AnimatePresence } from "framer-motion";

const CATEGORIES = ["All", "Marketing", "Development", "Design", "Writing"];

function ExploreContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState("Newest First");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const ITEMS_PER_PAGE = 50;

  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        q: q,
        category: activeCategory,
        platform: selectedPlatforms.join(","),
        minRating: minRating?.toString() || "",
        sortBy: sortBy,
        minPrice: priceRange[0].toString(),
        maxPrice: priceRange[1].toString(),
      });

      const res = await fetch(`/api/prompts?${params.toString()}`);
      const data = await res.json();
      setPrompts(data.prompts || []);
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, [q, priceRange, activeCategory, selectedPlatforms, minRating, sortBy, currentPage]);

  return (
    <div className="container mx-auto px-6 py-8 max-w-[1400px]">
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 pb-6 border-b border-border">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight text-foreground">
              Market <span className="text-primary italic">Logic</span>
            </h1>
            <p className="text-muted-foreground text-sm font-medium">Explore engineered prompts from master creators.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Tabs value={activeCategory} className="w-full sm:w-fit">
              <TabsList className="bg-secondary border border-border p-1 h-10 rounded-lg flex overflow-x-auto scrollbar-hide">
                {CATEGORIES.map((cat) => (
                  <TabsTrigger 
                    key={cat} 
                    value={cat}
                    className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-5 font-bold text-[11px] uppercase tracking-wider transition-all"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                "h-10 rounded-lg px-5 gap-2 font-bold text-[11px] uppercase tracking-widest border-border",
                showFilters ? "bg-primary/5 text-primary border-primary/30" : "bg-background text-foreground hover:bg-muted"
              )}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </Button>
          </div>
        </div>

        <AnimatePresence>
          <FilterPanel 
            show={showFilters}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedPlatforms={selectedPlatforms}
            togglePlatform={(p) => setSelectedPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])}
            minRating={minRating}
            setMinRating={setMinRating}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </AnimatePresence>

        <PromptGrid prompts={prompts} loading={loading} />
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
      <ExploreContent />
    </Suspense>
  );
}
