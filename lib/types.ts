import { CartStatusEnum, OrderStatusEnum } from "./enums";

type CategoryBase = {
  name: string;
  description: string;
};

export type CategoryData = CategoryBase;

export type Category = CategoryBase & {
  id: string;
};

type ColorBase = {
  name: string;
  hex: string;
};

export type ColorData = ColorBase;

export type Color = ColorBase & {
  id: string;
};

type SizeBase = {
  label: string;
};

export type SizeData = SizeBase;

export type Size = SizeBase & {
  id: string;
};

type ProductBase = {
  name: string;
  brand: string;
  description: string;
  category_name: string;
};

export type ProductData = ProductBase;

export type Product = ProductBase & {
  id: string;
};

type ProductVariantBase = {
  product_id: string;
  color_id: string;
  size_id: string;
  price: number;
};

export type ProductVariantData = ProductVariantBase;

export type ProductVariant = ProductVariantBase & {
  id: string;
};

export type FetchedData = {
  products: Product[];
  categories: Category[];
  colors: Color[];
  sizes: Size[];
  productVariants: ProductVariant[];
};

export type StorefrontVariant = {
  id: string;
  size: string;
  size_id: string;
  color: string;
  color_hex: string;
  color_id: string;
  price: number;
  image_url: string;
};

export type StorefrontProduct = {
  id: string;
  name: string;
  brand: string;
  description: string;
  category_name: string;
  variants: StorefrontVariant[];
};

export type StorefrontReview = {
  id: string;
  rating: number;
  title: string | null;
  content: string | null;
  product_variant_id: string;
  reviewer_name: string;
};

export type SFProductWithReview = StorefrontProduct & {
  reviews: StorefrontReview[];
};

export type StorefrontData = {
  products: StorefrontProduct[];
};

type MessageBase = {
  role: string;
  content: string;
};

export type MessageData = MessageBase & {
  id: string;
};

type MessageResponse = {
  id: string;
  content: string;
};

export type ChatResponse = {
  conversation_id: string;
  messages: MessageResponse[];
};

type CartBase = {
  status: CartStatusEnum;
};

export type Cart = CartBase & {
  id: string;
  user_id: string;
};

type CartLineItemBase = {
  product_variant_id: string;
  quantity: number;
  price: number;
  name: string;
};

export type CartLineItemData = CartLineItemBase;

export type CartLineItem = CartLineItemBase & {
  id: string;
  cart_id: string;
  image_url?: string;
};

type WishlistItemBase = {
  product_id: string;
  price: number;
  name: string;
};

export type WishlistItemData = WishlistItemBase;

export type WishlistItem = WishlistItemBase & {
  id: string;
  user_id: string;
  image_url?: string;
};

type OrderBase = {
  full_name: string;
  email: string;
  address: string;
  city: string;
  country: string;
  status: OrderStatusEnum;
};

export type OrderData = OrderBase;

export type Order = OrderBase & {
  id: string;
};

type OrderItemBase = {
  product_variant_id: string;
  quantity: number;
  price: number;
  name: string;
};

export type OrderItemData = OrderItemBase;

export type OrderItem = OrderItemBase & {
  id: string;
  order_id: string;
  image_url?: string;
  review?: Review;
};

export type OrderWithItems = {
  order: Order;
  order_items: OrderItem[];
};

type ReviewBase = {
  rating: number;
  title: string;
  content: string;
};

export type ReviewData = ReviewBase & {
  product_variant_id: string;
  order_item_id: string;
};

export type Review = ReviewData & {
  id: string;
};

export type UserReviewResponse = {
  review: Review | null;
  order_item: OrderItem;
};

export type Tokens = {
  access_token: string;
  refresh_token: string;
};

// Claims 
export type ClaimItem = {
  id: string;
  claim_id: string;
  order_item_id: string;
  quantity: number;
  resolution: string;
  refund_amount: string;
};

export type ClaimRequest = {
  id: string;
  user_id: string;
  order_id: string;
  reason: string;
  status: string; 
};

export type ClaimWithItems = {
  claim_request: ClaimRequest;
  items: ClaimItem[];
};


// PRoduct revierews page 
export interface ProductReviewsProps {
  reviews: SFProductWithReview["reviews"];
  getVariantForReview: (variantId: string) => SFProductWithReview["variants"][0] | undefined;
  averageRating: number;
}

// Product options props 
export interface ProductOptionsProps {
  productId: string;
  productName: string;
  variants: StorefrontVariant[];
  availableSizes: Size[];
  token?: string;
}

// Product info props 
export interface ProductInfoProps {
  name: string;
  description: string;
  categoryName: string;
  price: number;
  id: string;
}