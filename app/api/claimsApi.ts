

export const getProducts = async (): Promise<Product[]> => {
    const resp = await fetch(PRODUCTS_URL)
    const data: Product[] = await resp.json()
    return data
}