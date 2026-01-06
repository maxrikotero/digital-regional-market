import React from "react";
import { ProducerForm } from "@/components/features/admin/ProducerForm";

export default function NewProducerPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Nuevo Productor</h2>
        <p className="text-muted-foreground">
          Completa el formulario para registrar una nueva familia productora.
        </p>
      </div>
      <div className="separator" />
      <ProducerForm />
    </div>
  );
}
