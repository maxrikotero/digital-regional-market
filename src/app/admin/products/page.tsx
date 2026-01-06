import React from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await api.products.list();
  const producers = await api.producers.list(); // Needed to map IDs to names?
  // Optimization: Could map producer names, or just show IDs or nothing for now.
  // Let's create a map for friendlier display.
  const producerMap = new Map(producers.map((p) => [p.id, p.name]));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Producto
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Productos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm text-left">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Nombre
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Productor
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Precio
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Stock
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Estado
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {products.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No hay productos registrados.
                    </td>
                  </tr>
                )}
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">
                      {product.name}
                    </td>
                    <td className="p-4 align-middle">
                      {producerMap.get(product.producer_id) || "Desconocido"}
                    </td>
                    <td className="p-4 align-middle">
                      ${product.price} / {product.unit}
                    </td>
                    <td className="p-4 align-middle">{product.stock}</td>
                    <td className="p-4 align-middle">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          product.active
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.active ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/products/${product.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
