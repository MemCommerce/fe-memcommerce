import { StorefrontProduct } from "./types";

export interface CategoryPageProps {
  products: StorefrontProduct[];
}

export interface ProductCardProps {
  product: StorefrontProduct;
}

export interface WishlistButtonProps {
  productId: string;
  productName: string;
  productPrice: number;
  showAlert: (message: string) => void;
}