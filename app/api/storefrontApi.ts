import { StorefrontData, StorefrontProduct } from "@/lib/types";
import { STOREFRONT_URL } from "@/lib/urls";

export const getStorefrontData = async (): Promise<StorefrontData> => {
  const url = `${STOREFRONT_URL}all`;
  const resp = await fetch(url);
  const data: StorefrontData = await resp.json();
  return data;
};

export const getStorefrontProductById = async (productId: string): Promise<StorefrontProduct> => {
  const url = `${STOREFRONT_URL}product/${productId}`;
  const resp = await fetch(url);
  const data: StorefrontProduct = await resp.json();
  return data;
};
