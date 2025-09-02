"use client";

import { FC, use, useState } from "react";
import { Heart } from "lucide-react";
import AuthContext from "@/context/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { WishlistButtonProps } from "@/lib/interfaces";
import { WishlistItemData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

const WishlistButton: FC<WishlistButtonProps> = ({ productId, productPrice, productName }) => {
  const { token } = use(AuthContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const isFavorited = wishlistItems.some((item) => item.product_id === productId);
  const { toast } = useToast();

  const text = isFavorited ? (
    <>
      <Heart className="h-6 w-6 text-red-500 fill-red-500" /> Remove from Wishlist
    </>
  ) : (
    <>
      <Heart className="h-6 w-6 text-gray-400" /> Add to Wishlist
    </>
  );

  const handleOnClick = async () => {
    if (!token) {
      toast({ title: "Unauthorized", description: "Please log in to add items to your wishlist.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    if (isFavorited) {
      const wishListItemId = wishlistItems.find((item) => item.product_id === productId)!.id;
      try {
        await removeFromWishlist(wishListItemId, token);
        toast({ title: "Removed", description: "Removed from wishlist." });
      } catch {
        toast({ title: "Error", description: "Failed to remove from wishlist.", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
      return;
    }

    const item: WishlistItemData = {
      product_id: productId,
      price: productPrice,
      name: productName,
    };

    try {
      await addToWishlist(item, token);
      toast({ title: "Added", description: "Added to wishlist!" });
    } catch {
      toast({ title: "Error", description: "Failed to add to wishlist.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={handleOnClick}
      variant="outline"
      className="w-full py-6 text-lg mt-2"
      size="lg"
    >
      {text}
    </Button>
  );
};

export default WishlistButton;