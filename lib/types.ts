import { CartStatusEnum } from "./enums";

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
