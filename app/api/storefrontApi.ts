import { StorefrontData } from "@/lib/types";
import { STOREFRONT_URL } from "@/lib/urls";

export const getStorefrontData = async (): Promise<StorefrontData> => {
    const resp = await fetch(STOREFRONT_URL);
    const data: StorefrontData = await resp.json();
    return data;
};