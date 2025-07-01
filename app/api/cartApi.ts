import { Cart, CartLineItem, CartLineItemData } from "@/lib/types";
import { CART_URL } from "@/lib/urls";


export async function postCart(token: string): Promise<Cart> {
  const res = await fetch(`${CART_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const cartData: Cart = await res.json();
  return cartData;
}

export async function getUserCart(token: string): Promise<Cart> {
  const res = await fetch(`${CART_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const cartData: Cart = await res.json();
  return cartData;
}

export async function postCartLineItem(cartLineItemData: CartLineItemData, token: string): Promise<CartLineItem> {
  const res = await fetch(`${CART_URL}add/cart_line_item`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cartLineItemData),
  });
  if (!res.ok) throw new Error(await res.text());
  const lineItem: CartLineItem = await res.json();
  return lineItem;
}

export async function deleteCartLineItem(lineItemId: string, token: string) {
  const res = await fetch(`${CART_URL}cart_line_item/${lineItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}

export async function patchCartLineItemQuantity(lineItemId: string, quantity: number, token: string): Promise<CartLineItem> {
  const res = await fetch(`${CART_URL}cart_line_item/${lineItemId}/${quantity}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const lineItem: CartLineItem = await res.json();
  return lineItem;
}

export async function patchCartStatus(status: string, token: string): Promise<Cart> {
  const res = await fetch(`${CART_URL}${status}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  const updatedCart: Cart = await res.json();
  return updatedCart;

}