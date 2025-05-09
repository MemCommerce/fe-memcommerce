import { Category, Color, FetchedData, Product, ProductVariant, Size } from "./types";

export interface CategoryPageProps {
  data: FetchedData;
}

export interface ProductCardProps {
  product: Product;
  productVariants: ProductVariant[];
  sizes: Size[];
  colors: Color[];
  categories: Category[];
}
