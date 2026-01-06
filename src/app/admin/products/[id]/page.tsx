import React from "react";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ProductForm } from "@/components/features/admin/ProductForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await api.products.get(id);
  const producers = await api.producers.list();

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Editar Producto</h2>
        <p className="text-muted-foreground">
          Actualiza la información del producto {product.name}.
        </p>
      </div>
      <div className="separator" />
      <ProductForm product={product} producers={producers} />
    </div>
  );
}
