import { Product } from "@/lib/types"
import { PRODUCTS_URL } from "@/lib/urls"

export const getProducts = async (): Promise<Product[]> => {
    const resp = await fetch(PRODUCTS_URL)
    const data: Product[] = await resp.json()
    return data
}
