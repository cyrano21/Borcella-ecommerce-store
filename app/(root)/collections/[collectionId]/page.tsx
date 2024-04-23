import Image from "next/image";
import React from "react";
import { generateColor, getContrastColor } from "@/utils/colorGenerator";
import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import { ProductType } from "@/lib/types"; // Importez les fonctions ici

const CollectionDetails = async ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const collectionDetails = await getCollectionDetails(params.collectionId);

  if (!collectionDetails) {
    return (
      <div>
        Erreur lors du chargement des détails de la collection. Veuillez
        réessayer plus tard.
      </div>
    );
  }

  const backgroundColor = generateColor(params.collectionId);
  const textColor = getContrastColor(backgroundColor);

  // @ts-ignore
  return (
    <div className="px-10 py-5 flex flex-col items-center gap-8">
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3-bold text-grey-2">
        {collectionDetails.title}
      </p>
      <p className="text-body-normal text-grey-2 text-center max-w-[900px]">
        {collectionDetails.description}
      </p>
      <div className="flex flex-wrap gap-16 justify-center">
        {collectionDetails.products.map((product: ProductType) => (
          <ProductCard
            key={product._id}
            product={{ ...product, title: product.title || "No title" }}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
