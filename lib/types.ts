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

export type CartItem = {
  id: string;
  price: number;
  quantity: number;
  image_url: string;
  name: string;
  size: string;
  color: string;
};
