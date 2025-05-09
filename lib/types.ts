  export interface CartItem extends Product {
    selectedSize: string
    selectedColor: string
    quantity: number
  }
  
  export type Theme = "light" | "dark";

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
}

export type SizeData = SizeBase

export type Size = SizeBase & {
    id: string;
}

type ProductBase = {
    name: string;
    brand: string;
    description: string;
    category_id: string;
}

export type ProductData = ProductBase

export type Product = ProductBase & {
    id: string;
}

type ProductVariantBase = {
    product_id: string;
    color_id: string;
    size_id: string;
    price: number;
}

export type ProductVariantData = ProductVariantBase

export type ProductVariant = ProductVariantBase & {
    id: string;
}

export type FetchedData = {
  products: Product[]
  categories: Category[]
  colors: Color[]
  sizes: Size[]
  productVariants: ProductVariant[]
}
