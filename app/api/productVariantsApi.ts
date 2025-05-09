import { ProductVariant } from "@/lib/types";
import { PRODUCT_VARIANTS_URL } from "@/lib/urls";

export const getPvs = async (): Promise<ProductVariant[]> => {
    const resp = await fetch(PRODUCT_VARIANTS_URL);
    const data: ProductVariant[] = await resp.json();
    return data;
};