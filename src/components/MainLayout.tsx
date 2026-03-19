"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { cn } from "@/lib/utils";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth";

  return (
    <div className="flex w-full">
      <div className={cn(
        "flex-1 flex flex-col min-h-screen overflow-x-hidden transition-all duration-300 w-full"
      )}>
        <Navbar />
        <main className="flex-grow w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
