import { WISHLIST_URL } from "@/lib/urls";
import { WishlistItem, WishlistItemData } from "@/lib/types";

async function handleApiError(res: Response) {
  let errorMessage = `HTTP ${res.status} ${res.statusText}`;

  try {
    const data = await res.json();
    if (data?.detail) {
      errorMessage += ` → ${data.detail}`;
    } else {
      errorMessage += ` → ${JSON.stringify(data)}`;
    }
  } catch {
    const text = await res.text();
    if (text) {
      errorMessage += ` → ${text}`;
    }
  }

  throw new Error(errorMessage);
}

export async function postWishlistItem(item: WishlistItemData, token: string): Promise<WishlistItem> {
  const res = await fetch(`${WISHLIST_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(item),
  });
  if (!res.ok) await handleApiError(res);

  return res.json();
}

export async function getWishlist(token: string): Promise<WishlistItem[]> {
  const res = await fetch(`${WISHLIST_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) await handleApiError(res);

  return res.json();
}

export async function deleteWishlistItem(itemId: string, token: string) {
  const res = await fetch(`${WISHLIST_URL}${itemId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) await handleApiError(res);

  return true;
}
