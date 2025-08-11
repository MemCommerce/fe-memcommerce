"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getWishlist, postWishlistItem, deleteWishlistItem } from "@/app/api/wishlistApi";
import { WishlistItem, WishlistItemData } from "@/lib/types";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  loadWishlist: (token: string) => void;
  addToWishlist: (item: WishlistItemData, token: string) => void;
  removeFromWishlist: (itemId: string, token: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlistItems");
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
  }, []);

  const loadWishlist = async (token: string) => {
    try {
      const items = await getWishlist(token);
      setWishlistItems(items);
      localStorage.setItem("wishlistItems", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  };

  const addToWishlist = async (item: WishlistItemData, token: string) => {
    try {
      const added = await postWishlistItem(item, token);
      const newState = [...wishlistItems, added];
      setWishlistItems(newState);
      localStorage.setItem("wishlistItems", JSON.stringify(newState));
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
    }
  };

  const removeFromWishlist = async (itemId: string, token: string) => {
    try {
      await deleteWishlistItem(itemId, token);
      const newState = wishlistItems.filter((item) => item.id !== itemId);
      setWishlistItems(newState);
      localStorage.setItem("wishlistItems", JSON.stringify(newState));
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, loadWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
