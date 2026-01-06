"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function ParallaxImage({ src, alt, className }: ParallaxImageProps) {
  // Simple CSS implementation using sticky positioning for a parallax-like reveal effect
  // visual effect: The image stays fixed while container scrolls over it, or standard reveal.

  // Actually, a nice "Stacking Cards" or "Sticky Reveal" effect works great for storytelling without complex JS.
  // Each section is sticky top-0, and the next one covers it.

  return (
    <div className={cn("relative h-[60vh] w-full overflow-hidden", className)}>
      {/* CSS Parallax implementation for modern browsers */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url(${src})`,
          // Note: bg-fixed disable on some mobile browsers, we can fallback to just cover
        }}
      >
        {/* If bg-fixed doesn't work well on mobile, we can use an image with object-cover
                 and just let it scroll normally, OR usage a transform.
                 For MVP, let's try standard Image component with fixed position container if possible, 
                 but simplest robust way is background-attachment: fixed where supported, and normal scroll on iOS.
              */}
      </div>

      {/* Fallback/SEO Image (hidden from view but semantic) */}
      <Image src={src} alt={alt} fill className="opacity-0" />
    </div>
  );
}
