"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingCart, Store, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  // Hide on admin routes?
  if (pathname?.startsWith("/admin")) return null;

  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed bottom-0 z-50 w-full border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex h-16 items-center justify-around px-4">
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center gap-1",
            isActive("/") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">Inicio</span>
        </Link>
        <Link
          href="/products"
          className={cn(
            "flex flex-col items-center gap-1",
            isActive("/products") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <Store className="h-5 w-5" />
          <span className="text-[10px] font-medium">Feria</span>
        </Link>
        <Link
          href="/cart"
          className={cn(
            "flex flex-col items-center gap-1",
            isActive("/cart") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="text-[10px] font-medium">Carrito</span>
        </Link>
        {/* Simple Login/Admin access for MVP */}
        <Link
          href="/admin/login"
          className={cn(
            "flex flex-col items-center gap-1",
            isActive("/admin/login") ? "text-primary" : "text-muted-foreground"
          )}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Cuenta</span>
        </Link>
      </div>
    </div>
  );
}
