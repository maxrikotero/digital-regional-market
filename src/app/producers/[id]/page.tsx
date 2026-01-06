import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ProductGrid } from "@/components/features/products/ProductGrid";
import { MapPin } from "lucide-react";

// Parallax/Story components

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProducerDetailPage({ params }: Props) {
  const { id } = await params;
  const producer = await api.producers.get(id);

  if (!producer) notFound();

  // Fetch producer's products
  const products = await api.products.list(producer.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[50vh] min-h-[400px] w-full">
        <Image
          src={producer.image_url}
          alt={producer.name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4 border border-white/30">
              <MapPin className="h-4 w-4 mr-2" />
              {producer.region}, Salta
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              {producer.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Intro / Story */}
      <section className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Nuestra Historia
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          {producer.history}
        </p>
      </section>

      {/* Production Process - Parallax Gallery 
          Using sticky positioning to create a "reveal" effect as requested (4 photos)
      */}
      <section className="bg-secondary/20 py-16">
        <div className="container mx-auto px-4 mb-8 text-center">
          <h2 className="text-2xl font-bold text-primary">Cómo producimos</h2>
          <p className="text-muted-foreground">
            Un recorrido visual por nuestro proceso
          </p>
        </div>

        <div className="w-full">
          {producer.images?.map((imgUrl, index) => (
            <div
              key={index}
              className="sticky top-16 md:top-20 z-0 flex flex-col items-center justify-center min-h-[70vh] w-full bg-background border-t border-border/50 shadow-sm first:border-t-0"
            >
              <div className="relative w-full h-full min-h-[70vh] max-w-5xl mx-auto overflow-hidden">
                {/* 
                         To simulate parallax without jank, we can just display the image full cover.
                         The "sticky" parent makes them stack on top of each other as you scroll.
                     */}
                <Image
                  src={imgUrl}
                  alt={`Proceso de producción ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8 md:p-12">
                  <span className="text-white/80 text-sm font-mono tracking-widest uppercase">
                    Paso {index + 1}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spacer to allow scrolling past the last sticky item */}
        <div className="h-[20vh] bg-background" />
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center">
          Productos de {producer.name}
        </h2>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
