import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/Card";
import { MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProducersPage() {
  const producers = await api.producers.list();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Nuestros Productores
        </h1>
        <p className="text-muted-foreground">
          Conoce a las familias detrás de cada producto. Historias de esfuerzo,
          tradición y amor por la tierra en los Valles Calchaquíes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {producers.map((producer) => (
          <Link
            href={`/producers/${producer.id}`}
            key={producer.id}
            className="group"
          >
            <Card className="h-full overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={producer.image_url}
                  alt={producer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="flex items-center text-sm font-medium mb-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {producer.region}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {producer.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {producer.description}
                </p>
                <div className="mt-4 text-sm font-medium text-accent">
                  Leer historia completa &rarr;
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
