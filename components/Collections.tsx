// Collections.tsx
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCollections } from "@/lib/actions/actions";

const Collections = async () => {
  const collections = await getCollections();

  // Fonction pour générer une couleur basée sur l'ID de la collection
  const generateColor = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();
    return "#" + "00000".substring(0, 6 - color.length) + color;
  };

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-heading1-bold">Collections</p>
      {!collections || collections.length === 0 ? (
        <p className="text-body-bold">No collections found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {collections.map((collection) => (
            <Link
              href={`/collections/${collection._id}`}
              key={collection._id}
              style={{ backgroundColor: generateColor(collection._id) }}
              className="transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Image
                src={collection.image}
                alt={collection.title}
                width={350}
                height={200}
                className="rounded-lg shadow-lg cursor-pointer hover:shadow-xl"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
