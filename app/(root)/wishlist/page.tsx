"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ProductType, UserType } from "@/lib/types";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");

      console.log("res", res);

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log("data", data);
      setSignedInUser(data);
      console.log("signedInUser", signedInUser);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser().then((r) => r);
    }
  }, [user]);

  const getWishlistProducts = async () => {
    if (!signedInUser?.wishlist) {
      return;
    }
    setLoading(true);

    try {
      const wishlistProducts = await Promise.all(
        signedInUser.wishlist.map(async (productId) => {
          return getProductDetails(productId);
        }),
      );
      setWishlist(wishlistProducts);
    } catch (error) {
      console.error("Failed to fetch wishlist products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts().then((r) => r);
    }
  }, [signedInUser]);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <p className="text-heading3-bold my-10">Your Wishlist</p>
      {wishlist.length === 0 && <p>No items in your wishlist</p>}

      <div className="flex flex-wrap justify-center gap-16">
        {wishlist.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            updateSignedInUser={updateSignedInUser}
          />
        ))}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
