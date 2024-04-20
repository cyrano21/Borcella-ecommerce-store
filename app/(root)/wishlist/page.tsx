"use client";


import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import {getProductDetails} from "@/lib/actions/actions";
import {useUser} from "@clerk/nextjs";
import {useEffect, useState} from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setSignedInUser(data);
    } catch (err) {
      console.error("[users_GET]", err);
    } finally {
      setLoading(false);  // Ensure loading is set to false in all cases
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    if (!signedInUser?.wishlist) return;

    const wishlistProducts = await Promise.all(
        signedInUser.wishlist.map(async (productId) => {
          try {
            const res = await getProductDetails(productId);
            if (!res.ok) throw new Error(`Failed to fetch product ${productId}`);
            return await res.json();
          } catch (error) {
            console.error('Error fetching product details', error);
            return null;  // Return null to filter out later
          }
        })
    );

    const validProducts = wishlistProducts.filter(Boolean);  // Filter out null values
    setWishlist(validProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  return loading ? (
      <Loader />
  ) : (
      <div className="px-10 py-5">
        <p className="text-heading3-bold my-10">Vos favoris</p>
        {wishlist.length === 0 ? (
            <p>Aucun article dans votre liste de souhaits</p>
        ) : (
            <div className="flex flex-wrap justify-center gap-16">
              {wishlist.map((product) => (
                  <ProductCard
                      key={product._id}
                      product={product}
                  />
              ))}
            </div>
        )}
      </div>
  );
};

export default Wishlist;

