"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/hooks/useCart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ProductCardProps } from "@/lib/interfaces";

export default function ProductCard({ product, productVariants, colors, sizes, categories }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(productVariants[0]?.size_id);
  const [selectedColor, setSelectedColor] = useState(productVariants[0]?.color_id);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity: 1,
    });
  };

  return (
    <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden">
        <Image
          src={product.image || "/t-shirt-placeholder.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg hover:underline">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{categories.find((c) => c.id === product.category_id)?.name}</p>
          <p className="font-bold text-lg mb-4">${productVariants[0]?.price}</p>
        </Link>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Size</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {productVariants.map((pv) => (
                  <SelectItem key={pv.id} value={pv.size_id}>
                    {sizes.find((s) => s.id === pv.size_id)?.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Color</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {productVariants.map((pv) => (
                  <SelectItem key={pv.id} value={pv.color_id}>
                    {colors.find((c) => c.id ===pv.color_id)?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleAddToCart} className="w-full">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
