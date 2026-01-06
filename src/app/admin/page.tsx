import React from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Users, Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const producers = await api.producers.list();
  const products = await api.products.list();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Bienvenido al panel de administración de la Feria Digital.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md bg-white/60 backdrop-blur-sm group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Users className="w-24 h-24 text-primary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Productores
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">
              {producers.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Familias productoras registradas
            </p>
            <div className="mt-6">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <Link href="/admin/producers">Ver todos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 border-none shadow-md bg-white/60 backdrop-blur-sm group overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Package className="w-24 h-24 text-primary" />
          </div>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Total Productos
            </CardTitle>
            <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Package className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-bold text-foreground">
              {products.length}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Productos activos en catálogo
            </p>
            <div className="mt-6">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors"
              >
                <Link href="/admin/products">Ver todos</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <span className="w-1 h-8 bg-accent rounded-full inline-block"></span>
          Acciones Rápidas
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link href="/admin/producers/new" className="group">
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-primary/50 cursor-pointer h-full gap-3">
              <div className="p-3 bg-secondary/50 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Nuevo Productor
              </span>
            </div>
          </Link>
          <Link href="/admin/products/new" className="group">
            <div className="flex flex-col items-center justify-center p-6 bg-white border border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-primary/50 cursor-pointer h-full gap-3">
              <div className="p-3 bg-secondary/50 rounded-full text-primary group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                Nuevo Producto
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
