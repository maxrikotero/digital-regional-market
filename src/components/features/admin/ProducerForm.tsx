"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  createProducer,
  updateProducer,
  deleteProducer,
} from "@/app/actions/producers";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

// Minimal type definition to avoid importing server types if complex
interface ProducerConfig {
  id?: string;
  name?: string;
  region?: string;
  description?: string;
  history?: string;
  contact_info?: string;
  image_url?: string;
  images?: string[];
}

import { CloudinaryUploadWidget } from "@/components/ui/CloudinaryUploadWidget";

export function ProducerForm({ producer }: { producer?: ProducerConfig }) {
  const isEdit = !!producer;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [imageUrl, setImageUrl] = useState(producer?.image_url || "");

  const handleDelete = async () => {
    if (!producer?.id) return;
    if (!confirm("¿Estás seguro de eliminar este productor?")) return;

    setIsDeleting(true);
    await deleteProducer(producer.id);
    // Redirect handled by server action or client router push if needed
    // But deleteProducer revalidates, we might need to manually go back if not redirecting
    router.push("/admin/producers");
  };

  // We wrap server actions to pass ID for update
  const handleSubmit = async (formData: FormData) => {
    if (isEdit && producer?.id) {
      await updateProducer(producer.id, formData);
    } else {
      await createProducer(formData);
    }
  };

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Nombre del Productor
          </label>
          <Input
            name="name"
            defaultValue={producer?.name}
            required
            placeholder="Ej: Finca El Sol"
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Región
          </label>
          <Input
            name="region"
            defaultValue={producer?.region}
            required
            placeholder="Ej: Seclantás"
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Descripción Corta
          </label>
          <textarea
            name="description"
            defaultValue={producer?.description}
            required
            placeholder="Breve descripción para la tarjeta..."
            className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Historia Completa
          </label>
          <textarea
            name="history"
            defaultValue={producer?.history}
            placeholder="Historia detallada para la página de perfil..."
            className="flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Información de Contacto
          </label>
          <Input
            name="contact_info"
            defaultValue={producer?.contact_info}
            placeholder="Teléfono, Email, etc."
            className="mt-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Imagen Principal
          </label>
          {/* Visual Preview */}
          {imageUrl && (
            <div className="mt-2 mb-2 relative w-full h-48 rounded-lg overflow-hidden border border-input">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => setImageUrl("")}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}

          <div className="mt-2">
            <CloudinaryUploadWidget
              label={
                imageUrl ? "Cambiar Imagen Principal" : "Subir Imagen Principal"
              }
              onUpload={(url) => setImageUrl(url)}
              folder="feria-digital/producers"
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

        <div>
          {/* Gallery implementation is complex for array, keeping basic text input for now or could implement append logic.
               Simplifying to text input for gallery to avoid overengineering in Step 1 of integration, focused on main image upload first effectively.
               But user asked to upload images. Let's add a button to APPEND to this list. */}
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Galería de Imágenes
          </label>
          <div className="mt-2 mb-2">
            <CloudinaryUploadWidget
              label="Subir a Galería (Agrega URL abajo)"
              onUpload={(url) => {
                // Simple append logic for the input value
                const input = document.querySelector(
                  'input[name="images"]'
                ) as HTMLInputElement;
                if (input) {
                  const current = input.value;
                  input.value = current ? current + ", " + url : url;
                }
              }}
              folder="feria-digital/producers/gallery"
            />
          </div>
          <Input
            name="images"
            defaultValue={producer?.images?.join(", ")}
            placeholder="URLs aparecerán aquí..."
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Sube una imagen y su URL se agregará automáticamente aquí.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button type="submit">
          {isEdit ? "Guardar Cambios" : "Crear Productor"}
        </Button>

        {isEdit && (
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {isDeleting ? "Eliminando..." : "Eliminar Productor"}
          </Button>
        )}
      </div>
    </form>
  );
}
