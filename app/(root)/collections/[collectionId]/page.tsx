import React from "react";
import Image from "next/image";
import { generateColor, getContrastColor } from "@/utils/colorGenerator";
import ProductCard from "@/components/ProductCard";
import { getCollectionDetails } from "@/lib/actions/actions";
import { ProductType } from "@/lib/types";

const CollectionDetails = async ({ params }) => {
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

  return (
    <div
      style={{
        backgroundColor,
        color: textColor,
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Montserrat', sans-serif",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
      }}
      className="flex flex-col items-center gap-8 p-10"
    >
      <Image
        src={collectionDetails.image}
        width={1500}
        height={1000}
        alt="collection"
        className="w-full h-[400px] object-cover rounded-xl"
      />
      <p className="text-heading3-bold">{collectionDetails.title}</p>
      <p className="text-body-normal text-center max-w-[900px]">
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
