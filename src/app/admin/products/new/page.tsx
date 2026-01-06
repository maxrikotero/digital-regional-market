import React from "react";
import { ProductForm } from "@/components/features/admin/ProductForm";
import { api } from "@/lib/api";

export default async function NewProductPage() {
  const producers = await api.producers.list();

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Nuevo Producto</h2>
        <p className="text-muted-foreground">
          Agrega un nuevo producto al catálogo.
        </p>
      </div>
      <div className="separator" />
      <ProductForm producers={producers} />
    </div>
  );
}
