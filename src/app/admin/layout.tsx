import React from "react";
import Link from "next/link";
import { LayoutDashboard, Users, Package } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-muted/20 text-foreground">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-white/50 backdrop-blur-xl sm:block transition-all duration-300 ease-in-out shadow-sm">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-border/50 px-6">
            <Link
              className="flex items-center gap-2 font-bold tracking-tight text-primary transition-colors hover:text-primary/80"
              href="/admin"
            >
              <Package className="h-6 w-6" />
              <span className="text-xl">Feria Admin</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="grid gap-2 px-4 text-sm font-medium">
              <li>
                <Link
                  href="/admin"
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                >
                  <LayoutDashboard className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Dashboard
                </Link>
              </li>
              <li>
                <div className="my-2 border-t border-border/50 mx-3"></div>
                <p className="px-3 text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-2">
                  Gestión
                </p>
              </li>
              <li>
                <Link
                  href="/admin/producers"
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                >
                  <Users className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Productores
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
                >
                  <Package className="h-4 w-4 transition-transform group-hover:scale-110" />
                  Productos
                </Link>
              </li>
            </ul>
          </nav>

          <div className="border-t border-border/50 p-4">
            <div className="rounded-lg bg-secondary/30 p-4">
              <p className="text-xs text-muted-foreground text-center">
                &copy; 2024 Feria Local
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 sm:pl-64 transition-all duration-300">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white/50 backdrop-blur-md px-6 shadow-sm sm:hidden">
          <Link
            className="flex items-center gap-2 font-bold text-primary"
            href="/admin"
          >
            <Package className="h-5 w-5" />
            <span className="text-lg">Feria Admin</span>
          </Link>
        </header>
        <div className="container mx-auto py-8 px-4 sm:px-8 max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}
