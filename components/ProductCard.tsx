"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { ProductType, UserType } from "@/lib/types";
import React from "react";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
  style?: React.CSSProperties;
}

// @ts-ignore
// @ts-ignore
const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  // Vous pouvez maintenant utiliser `images` dans ce composant

  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2 transition-transform duration-300 ease-in-out hover:scale-110"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-body-bold">{product.price} €</p>
        <HeartFavorite
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
