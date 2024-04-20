"use client"

import {useUser} from "@clerk/nextjs";
import {Heart} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

interface HeartFavoriteProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const HeartFavorite = ({ product, updateSignedInUser }: HeartFavoriteProps) => {
  const router = useRouter();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/users");

      // Check if the HTTP status code indicates success before proceeding
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`); // You can customize the error message or handle different statuses differently
      }

      const data = await res.json();

      // Ensure the product and its _id are defined before trying to access the wishlist
      if (product && 'wishlist' in data) {
        setIsLiked(data.wishlist.includes(product._id));
      } else {
        console.log("Product data is missing or invalid.");
        // Handle missing data as necessary, possibly setting defaults or error states
      }

      setLoading(false);
    } catch (err) {
      console.error("[users_GET]", err);
      setLoading(false);
      // Optionally set an error state here to give feedback to the user
    }
  };


  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
      if (!user) {
        router.push("/sign-in");
        return;
      } else {
        const res = await fetch("/api/users/wishlist", {
          method: "POST",
          body: JSON.stringify({ productId: product._id }),
        });
        const updatedUser = await res.json();
        setIsLiked(updatedUser.wishlist.includes(product._id));
        updateSignedInUser && updateSignedInUser(updatedUser);
      }
    } catch (err) {
      console.log("[wishlist_POST]", err);
    }
  };

  return (
    <button onClick={handleLike}>
      <Heart fill={`${isLiked ? "red" : "white"}`} />
    </button>
  );
};

export default HeartFavorite;
