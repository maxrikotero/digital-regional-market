import React, { Suspense } from "react";
import { api } from "@/lib/api";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Search, Filter } from "lucide-react";

// Force dynamic to ensure we get fresh data (or we could use revalidate)
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await api.products.list();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Nuestros Productos
          </h1>
          <p className="text-muted-foreground">
            Explora lo mejor de la producción local.
          </p>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar..." className="pl-9" />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="text-center py-12">Cargando productos...</div>
        }
      >
        <ProductGrid products={products} />
      </Suspense>
    </div>
  );
}
