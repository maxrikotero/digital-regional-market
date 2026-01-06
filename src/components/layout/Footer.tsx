import React from "react";
import { Store } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-muted/20 py-12 md:py-16 pb-24 md:pb-16 px-4">
      {/* Added extra padding bottom for Mobile Nav on mobile (pb-24) */}
      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">Feria Local</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Conectando productores rurales con consumidores conscientes. De la
            tierra a tu mesa.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Comprar</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Productos Frescos</li>
            <li>Artesanías</li>
            <li>Productores</li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-foreground mb-4">Ayuda</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Cómo comprar</li>
            <li>Envíos</li>
            <li>Contacto</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Feria Local. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
