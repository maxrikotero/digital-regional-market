import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import { ProductGrid } from "@/components/features/products/ProductGrid";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await api.products.list();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12 pb-12">
      <section className="relative bg-primary/5 py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary">
            Feria Digital Artesanal
          </h1>
          <p className="text-xl text-muted-foreground w-full max-w-2xl mx-auto">
            Productos frescos, artesanales y auténticos, directamente de los
            productores de los Valles Calchaquíes a tu hogar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/products">
              <Button size="lg" className="w-full sm:w-auto">
                Ver Todos los Productos
              </Button>
            </Link>
            <Link href="/producers">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Conocer Productores
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-primary">
            Destacados de la Semana
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-accent hover:underline"
          >
            Ver todo &rarr;
          </Link>
        </div>
        <ProductGrid products={featuredProducts} />
      </section>

      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-8">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Verduras", "Frutas", "Artesanías", "Conservas"].map((cat) => {
            const images: Record<string, string> = {
              Verduras:
                "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80",
              Frutas:
                "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&q=80",
              Artesanías:
                "https://images.unsplash.com/photo-1455620611406-966ca681f280?auto=format&fit=crop&q=80",
              Conservas:
                "https://images.unsplash.com/photo-1587394622722-680c6a992643?auto=format&fit=crop&q=80",
            };
            return (
              <Link
                href={`/products?category=${cat}`}
                key={cat}
                className="group relative overflow-hidden rounded-lg aspect-auto h-32 flex items-center justify-center transition-all hover:scale-[1.02]"
              >
                <Image
                  src={images[cat] || "/placeholder.svg"}
                  alt={cat}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <span className="relative font-bold text-lg text-white z-10 tracking-wide">
                  {cat}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
