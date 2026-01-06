"use client";

import React, { useRef } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";

interface CloudinaryUploadWidgetProps {
  onUpload: (url: string) => void;
  folder?: string; // Optional folder parameter
  label?: string;
}

declare global {
  interface Window {
    cloudinary: any;
  }
}

export function CloudinaryUploadWidget({
  onUpload,
  folder = "feria-digital",
  label = "Subir Imagen",
}: CloudinaryUploadWidgetProps) {
  const cloudinaryRef = useRef<any>(null);
  const widgetRef = useRef<any>(null);

  const handleLoaded = () => {
    cloudinaryRef.current = window.cloudinary;
    if (!cloudinaryRef.current) return;

    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        folder: folder,
        sources: ["local", "url", "camera"],
        multiple: false,
        clientAllowedFormats: ["image"],
        maxImageFileSize: 2000000, // 2MB
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Upload success:", result.info);
          onUpload(result.info.secure_url);
        }
      }
    );
  };

  const openWidget = () => {
    if (widgetRef.current) {
      widgetRef.current.open();
    } else {
      // Fallback or retry if script hasn't loaded yet?
      // Usually Script onLoad handles it, but just in case:
      console.warn("Cloudinary widget not loaded yet");
    }
  };

  return (
    <>
      <Script
        src="https://upload-widget.cloudinary.com/global/all.js"
        type="text/javascript"
        onLoad={handleLoaded}
      />

      <Button
        type="button"
        variant="outline"
        onClick={openWidget}
        className="w-full sm:w-auto"
      >
        <Upload className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </>
  );
}
