"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "@/app/actions/products";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

interface ProductConfig {
  id?: string;
  producer_id?: string;
  name?: string;
  description?: string;
  price?: number;
  unit?: string;
  category?: string;
  image_url?: string;
  stock?: number;
  active?: boolean;
}

interface ProducerOption {
  id: string;
  name: string;
}

import { CloudinaryUploadWidget } from "@/components/ui/CloudinaryUploadWidget";

export function ProductForm({
  product,
  producers,
}: {
  product?: ProductConfig;
  producers: ProducerOption[];
}) {
  const isEdit = !!product;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageUrl, setImageUrl] = useState(product?.image_url || "");

  const handleDelete = async () => {
    if (!product?.id) return;
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    setIsDeleting(true);
    await deleteProduct(product.id);
    router.push("/admin/products");
  };

  const handleSubmit = async (formData: FormData) => {
    if (isEdit && product?.id) {
      await updateProduct(product.id, formData);
    } else {
      await createProduct(formData);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Productor
          </label>
          <select
            name="producer_id"
            defaultValue={product?.producer_id ?? ""}
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          >
            <option value="" disabled>
              Seleccionar Productor
            </option>
            {producers.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Nombre del Producto
          </label>
          <Input
            name="name"
            defaultValue={product?.name}
            required
            placeholder="Ej: Tomates Cherry"
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Descripción
          </label>
          <textarea
            name="description"
            defaultValue={product?.description}
            required
            placeholder="Descripción del producto..."
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Precio
            </label>
            <Input
              name="price"
              type="number"
              step="0.01"
              defaultValue={product?.price}
              required
              placeholder="0.00"
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Unidad
            </label>
            <Input
              name="unit"
              defaultValue={product?.unit}
              required
              placeholder="kg, unidad, atado"
              className="mt-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Categoría
            </label>
            <Input
              name="category"
              defaultValue={product?.category}
              required
              placeholder="Vegetables, Crafts..."
              className="mt-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Stock
            </label>
            <Input
              name="stock"
              type="number"
              defaultValue={product?.stock}
              required
              placeholder="0"
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Imagen del Producto
          </label>
          {/* Visual Preview */}
          {imageUrl && (
            <div className="mt-2 mb-2 relative w-32 h-32 rounded-lg overflow-hidden border border-input">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6"
                onClick={() => setImageUrl("")}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}

          <div className="mt-2">
            <CloudinaryUploadWidget
              label={imageUrl ? "Cambiar Imagen" : "Subir Imagen"}
              onUpload={(url) => setImageUrl(url)}
              folder="feria-digital/products"
            />
          </div>

          <Input
            name="image_url"
            type="hidden"
            value={imageUrl}
            required
            className="hidden"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="active"
            id="active"
            defaultChecked={product?.active ?? true}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="active"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Producto Activo
          </label>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit">
          {isEdit ? "Guardar Cambios" : "Crear Producto"}
        </Button>

        {isEdit && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Eliminando..." : "Eliminar Producto"}
          </Button>
        )}
      </div>
    </form>
  );
}
