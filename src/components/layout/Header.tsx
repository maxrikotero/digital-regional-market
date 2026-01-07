"use client";

import React from "react";
import Link from "next/link";
import { ShoppingCart, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">
            Feria Local
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/products"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/producers"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Productores
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {/* Cart Icon - Visible on all screens, but maybe rely on bottom nav for mobile? 
              Let's keep it here for Desktop, and maybe hide on mobile if Bottom Nav has it.
              For simplicity, keep on desktop only if Bottom Nav exists. 
              Actually, user might expect it top right. 
              Let's show on Desktop only, assuming Mobile Nav has Cart.
           */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex relative"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito</span>
            {/* Badge could go here */}
          </Button>

          {/* Admin Link (Temporary for MVP access) */}
          <Link href="/admin" className="hidden md:block">
            <Button variant="ghost" size="sm">
              Admin
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
