import { Category, Color, Product, ProductVariant, Size, StorefrontProduct } from "./types";

export interface CategoryPageProps {
  products: StorefrontProduct[];
}

export interface ProductCardProps {
  product: StorefrontProduct;
}
