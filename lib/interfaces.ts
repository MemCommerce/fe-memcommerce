import { SFProductWithReview, StorefrontProduct, StorefrontVariant } from "./types";

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

}

// PRoduct revierews page 
export interface ProductReviewsProps {
  reviews: SFProductWithReview["reviews"];
  getVariantForReview: (variantId: string) => SFProductWithReview["variants"][0] | undefined;
  averageRating: number;
}

// Product options props 
export interface ProductOptionsProps {
  product: SFProductWithReview;
  selectedVariant: StorefrontVariant;
  setSelectedVariant: React.Dispatch<React.SetStateAction<StorefrontVariant>>;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

// Product info props 
export interface ProductInfoProps {
  name: string;
  description: string;
  categoryName: string;
  price: number;
  id: string;
}