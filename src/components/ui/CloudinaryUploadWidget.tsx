"use client";

import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";

interface CloudinaryUploadWidgetProps {
  onUpload: (url: string) => void;
  folder?: string;
  label?: string;
}

export function CloudinaryUploadWidget({
  onUpload,
  folder = "feria-digital",
  label = "Subir Imagen",
}: CloudinaryUploadWidgetProps) {
  return (
    <CldUploadWidget
      uploadPreset={
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "default-preset"
      }
      options={{
        folder: folder,
        sources: ["local", "url", "camera"],
        multiple: false,
        clientAllowedFormats: ["image"],
        maxImageFileSize: 2000000,
      }}
      onSuccess={(result) => {
        if (
          typeof result.info === "object" &&
          result.info &&
          "secure_url" in result.info
        ) {
          console.log("Upload success:", result.info);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onUpload((result.info as any).secure_url);
        }
      }}
    >
      {({ open }) => {
        return (
          <Button
            type="button"
            variant="outline"
            onClick={() => open()}
            className="w-full sm:w-auto"
          >
            <Upload className="mr-2 h-4 w-4" />
            {label}
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}
