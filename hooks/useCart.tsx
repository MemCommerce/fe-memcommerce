"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import {
  postCartLineItem,
  deleteCartLineItem,
  patchCartLineItemQuantity,
  postCart,
  patchCartStatus,
} from "@/app/api/cartApi";
import { Cart, CartLineItem, CartLineItemData } from "@/lib/types";
import { CartStatusEnum } from "@/lib/enums";

interface CartContextType {
  cart: Cart | null;
  cartLineItems: CartLineItem[];
  createCart: (token: string) => void;
  updateCartStatus: (status: CartStatusEnum, token: string) => void;
  addToCart: (item: CartLineItemData, token: string) => void;
  removeFromCart: (cartLineItemId: string, token: string) => void;
  updateQuantity: (cartLineItemId: string, quantity: number, token: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartLineItems, setCartLineItems] = useState<CartLineItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedCartLineItems = localStorage.getItem("cartLineItems");
    if (savedCartLineItems) {
      setCartLineItems(JSON.parse(savedCartLineItems));
    }
  }, []);

  const createCart = async (token: string) => {
    try {
      const newCart = await postCart(token);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    } catch (error) {
      console.error("Failed to create cart:", error);
    }
  };

  const updateCartStatus = async (status: CartStatusEnum, token: string) => {
    if (!cart) {
      console.error("No cart to update status for");
      return;
    }
    try {
      const updatedCart = await patchCartStatus(status, token);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } catch (error) {
      console.error("Failed to update cart status:", error);
    }
  };

  const addToCart = async (item: CartLineItemData, token: string) => {
    if (!cart) {
      await createCart(token);
    }

    try {
      const addedItem = await postCartLineItem(item, token);
      const newCartLineItemsState = [...cartLineItems, addedItem];
      setCartLineItems(newCartLineItemsState);
      localStorage.setItem("cartLineItems", JSON.stringify(newCartLineItemsState));
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeFromCart = async (cartLineItemId: string, token: string) => {
    try {
      await deleteCartLineItem(cartLineItemId, token);
      const newCartLineItemsState = cartLineItems.filter((item) => item.id !== cartLineItemId);
      setCartLineItems(newCartLineItemsState);
      localStorage.setItem("cartLineItems", JSON.stringify(newCartLineItemsState));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const updateQuantity = async (cartLineItemId: string, quantity: number, token: string) => {
    try {
      const updatedItem = await patchCartLineItemQuantity(cartLineItemId, quantity, token);
      const newCartLineItemsState = cartLineItems.map((item) =>
        item.id === cartLineItemId ? { ...item, quantity: updatedItem.quantity } : item
      );
      setCartLineItems(newCartLineItemsState);
      localStorage.setItem("cartLineItems", JSON.stringify(newCartLineItemsState));
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartLineItems,
        createCart,
        updateCartStatus,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
