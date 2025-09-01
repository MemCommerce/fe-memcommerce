"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { getWishlist, postWishlistItem, deleteWishlistItem } from "@/app/api/wishlistApi";
import { WishlistItem, WishlistItemData } from "@/lib/types";

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  loadWishlist: (token: string) => Promise<void>;
  addToWishlist: (item: WishlistItemData, token: string) => Promise<void>;
  removeFromWishlist: (itemId: string, token: string) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const channel = new BroadcastChannel("wishlist_channel");
    channel.onmessage = (event) => {
      setWishlistItems(event.data);
    };

    const saved = localStorage.getItem("wishlistItems");
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }

    return () => {
      channel.close();
    };

  }, []);

  const broadcast = (items: WishlistItem[]) => {
    const channel = new BroadcastChannel("wishlist_channel");
    channel.postMessage(items);
    channel.close();
  };
  
  const loadWishlist = useCallback(async (token: string) => {
    try {
      const items = await getWishlist(token);
      setWishlistItems(items);
      broadcast(items); 
      // localStorage.setItem("wishlistItems", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    }
  }, []);

  const addToWishlist = async (item: WishlistItemData, token: string) => {
    try {
      const added = await postWishlistItem(item, token);
      const newState = [...wishlistItems, added];
      setWishlistItems(newState);
       broadcast(newState); // ✅ 
      // localStorage.setItem("wishlistItems", JSON.stringify(newState));
    } catch (error) {
      console.error("Failed to add item to wishlist:", error);
    }
  };

  const removeFromWishlist = async (itemId: string, token: string) => {
    try {
      await deleteWishlistItem(itemId, token);

      const newState = wishlistItems.filter((item) => item.id !== itemId);

      setWishlistItems(newState);
      broadcast(newState);
      // localStorage.setItem("wishlistItems", JSON.stringify(newState));
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
