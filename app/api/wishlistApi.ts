import { WISHLIST_URL } from "@/lib/urls";
import { WishlistItem, WishlistItemData } from "@/lib/types";

export async function postWishlistItem(item: WishlistItemData, token: string): Promise<WishlistItem> {
  const res = await fetch(`${WISHLIST_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function getWishlist(token: string): Promise<WishlistItem[]> {
  const res = await fetch(`${WISHLIST_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export async function deleteWishlistItem(itemId: string, token: string) {
  const res = await fetch(`${WISHLIST_URL}${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return true;
}
