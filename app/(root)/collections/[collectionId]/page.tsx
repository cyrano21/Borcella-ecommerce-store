// pages/collection/[collectionId].js

import Image from "next/image";
import React from "react";

import {generateColor, getContrastColor} from '@/utils/colorGenerator';
import ProductCard from "@/components/ProductCard";
import {getCollectionDetails} from "@/lib/actions/actions"; // Importez les fonctions ici

const CollectionDetails = async ({ params }) => {
    const collectionDetails = await getCollectionDetails(params.collectionId);
    if (!collectionDetails) {
        return <div>Erreur lors du chargement des détails de la collection. Veuillez réessayer plus tard.</div>;
    }

    const backgroundColor = generateColor(params.collectionId);
    const textColor = getContrastColor(backgroundColor);

    console.log(`BackgroundColor: ${backgroundColor}, TextColor: ${textColor}`);

    return (
        <div style={{ backgroundColor, color: textColor, minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }} className="flex flex-col items-center gap-8 p-10">
            <Image
                src={collectionDetails.image}
                width={1500}
                height={1000}
                alt="collection"
                className="w-full h-[400px] object-cover rounded-xl"
            />
            <p className="text-heading3-bold" style={{ color: textColor }}>
                {collectionDetails.title}
            </p>
            <p className="text-body-normal text-center max-w-[900px]" style={{ color: textColor }}>
                {collectionDetails.description}
            </p>
            <div className="flex flex-wrap gap-16 justify-center">
                {collectionDetails.products.map((product) => (
                    <ProductCard key={product._id} product={product} style={{ color: textColor }} />
                ))}
            </div>
        </div>
    );
};

export default CollectionDetails;

export const dynamic = "force-dynamic";
