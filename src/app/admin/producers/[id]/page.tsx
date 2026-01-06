import React from "react";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { ProducerForm } from "@/components/features/admin/ProducerForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProducerPage({ params }: Props) {
  const { id } = await params;
  const producer = await api.producers.get(id);

  if (!producer) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Editar Productor</h2>
        <p className="text-muted-foreground">
          Actualiza la información del productor {producer.name}.
        </p>
      </div>
      <div className="separator" />
      <ProducerForm producer={producer} />
    </div>
  );
}
