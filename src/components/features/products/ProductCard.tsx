"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Product } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  // Format price as currency
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Card
      className={cn("overflow-hidden flex flex-col h-full group", className)}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      <CardContent className="flex-1 p-4">
        <div className="text-xs text-muted-foreground mb-1">
          {product.category}
        </div>
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="font-semibold text-lg leading-tight mb-2 hover:text-primary transition-colors text-foreground line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-lg font-bold text-primary">
            {formattedPrice}
          </span>
          <span className="text-xs text-muted-foreground">
            por {product.unit}
          </span>
        </div>
        <Button
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full"
          title="Agregar al carrito"
        >
          <Plus className="h-5 w-5" />
          <span className="sr-only">Agregar</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
