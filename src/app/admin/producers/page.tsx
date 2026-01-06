import React from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function AdminProducersPage() {
  const producers = await api.producers.list();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Productores</h1>
        <Button asChild>
          <Link href="/admin/producers/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Productor
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Listado de Productores</CardTitle>
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
                    Región
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground">
                    Contacto
                  </th>
                  <th className="h-12 px-4 align-middle font-medium text-muted-foreground text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                {producers.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-4 text-center text-muted-foreground"
                    >
                      No hay productores registrados.
                    </td>
                  </tr>
                )}
                {producers.map((producer) => (
                  <tr
                    key={producer.id}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <td className="p-4 align-middle font-medium">
                      {producer.name}
                    </td>
                    <td className="p-4 align-middle">{producer.region}</td>
                    <td className="p-4 align-middle">
                      {producer.contact_info}
                    </td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="ghost" size="icon">
                          <Link href={`/admin/producers/${producer.id}`}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar</span>
                          </Link>
                        </Button>
                        {/* Delete would normally need a client component or server action form */}
                        <Button variant="ghost" size="icon" disabled>
                          <Trash2 className="h-4 w-4 text-destructive/50" />
                          <span className="sr-only">Eliminar</span>
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
