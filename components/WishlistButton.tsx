"use client";

import { FC, useState, useContext } from "react";
import { Heart } from "lucide-react";
import AuthContext from "@/context/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { WishlistButtonProps } from "@/lib/interfaces";
import { WishlistItemData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useToast } from "./ui/use-toast";

const WishlistButton: FC<WishlistButtonProps> = ({ productId, productPrice, productName }) => {
  const { token } = useContext(AuthContext);
  const { addToWishlist, wishlistItems, removeFromWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const { toast, ToastContainer } = useToast();

  const isFavorited = wishlistItems.some((item) => item.product_id === productId);

  const handleOnClick = async () => {
    if (!token) {
      toast({
        title: "Unauthorized",
        description: "Please log in to manage your wishlist.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorited) {
        const wishListItemId = wishlistItems.find((item) => item.product_id === productId)!.id;
        await removeFromWishlist(wishListItemId, token);
        toast({ title: "Removed", description: "Item removed from wishlist." });
      } else {
        const item: WishlistItemData = { product_id: productId, price: productPrice, name: productName };
        await addToWishlist(item, token);
        toast({ title: "Added", description: "Item added to wishlist!" });
      }
    } catch {
      toast({ title: "Error", description: "Operation failed.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        disabled={isLoading}
        onClick={handleOnClick}
        variant="outline"
        className="w-full py-6 text-lg mt-2"
        size="lg"
      >
        {isFavorited ? (
          <>
            <Heart className="h-6 w-6 text-red-500 fill-red-500" /> Remove from Wishlist
          </>
        ) : (
          <>
            <Heart className="h-6 w-6 text-gray-400" /> Add to Wishlist
          </>
        )}
      </Button>


      <ToastContainer />
    </>
  );
};

export default WishlistButton;