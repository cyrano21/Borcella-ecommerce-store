"use client";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
// Utilisation du composant Image de Next.js pour un chargement optimisé
import Image from "next/image";
import React, { useState } from "react";

// @ts-ignore
const Gallery = ({ productMedia }) => {
  const [mainImage, setMainImage] = useState(productMedia[0]);

  return (
    <div className="flex flex-col gap-3 max-w-[500px]">
      <Image
        src={mainImage}
        width={500}
        height={500}
        alt="product"
        className="rounded-lg shadow-xl object-cover"
        priority // Chargement prioritaire pour l'image principale
      />
      <div className="flex gap-2 overflow-auto">
        {productMedia.map(
          (
            image: string | StaticImport,
            index: React.Key | null | undefined,
          ) => (
            <Image
              key={index}
              src={image}
              height={100}
              width={100}
              alt="Thumbnail"
              className={`rounded-lg cursor-pointer ${mainImage === image ? "border-2 border-black" : ""}`}
              onClick={() => setMainImage(image)}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default Gallery;
