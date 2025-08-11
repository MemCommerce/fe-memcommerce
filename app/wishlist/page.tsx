"use client";

import { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { token } = useContext(AuthContext);
  const { wishlistItems, loadWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    if (token) {
      loadWishlist(token);
    }
  }, [token, loadWishlist]);

  if (!token) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Your Wishlist</h1>
        <p>Please log in to view your wishlist.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium text-gray-600">Your wishlist is empty</h2>
          <Button className="mt-4" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-20 h-20 relative flex-shrink-0">
                <Image src={item.image_url || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded-md" />
              </div>
              <div className="flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                <p className="font-medium">${item.price}</p>
              </div>
              <div className="text-right">
                <Button variant="ghost" className="text-red-500" onClick={() => removeFromWishlist(item.id, token!)}>
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
