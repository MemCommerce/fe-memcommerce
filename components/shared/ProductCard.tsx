"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ProductCardProps } from "@/lib/interfaces";
import { CartLineItemData, Size } from "@/lib/types";
import AuthContext from "@/context/AuthContext";

export default function ProductCard({ product }: ProductCardProps) {
  const { token } = useContext(AuthContext);
  const [selectedProductVariant, setSelectedProductVariant] = useState(product.variants[0])
  const availableSizes: Size[] = product.variants.reduce<Size[]>((acc, variant) => {
    if (acc.map((s) => s.id).includes(variant.size_id)) return acc
    const size: Size = {
      id: variant.size_id,
      label: variant.size
    }
    return [...acc, size];
  }, []);

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!token) {
      alert("Please log in to add items to your cart.");
      return;
    }

    const cartItem: CartLineItemData = {
      product_variant_id: selectedProductVariant.id,
      price: selectedProductVariant.price,
      quantity: 1,
      name: product.name,
    }
    addToCart(cartItem, token);
  };

  const handleSizeChange = (value: string) => {
    const newPvState = product.variants.find((pv) => pv.size_id === value)!
    setSelectedProductVariant(newPvState)
  }

  const handleColorChange = (value: string) => {
    setSelectedProductVariant((prev) => product.variants.find((pv) => pv.color_id === value && pv.size_id === prev.size_id)!)
  }

  return (
    <div className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden">
        <Image
          src={selectedProductVariant.image_url || "/t-shirt-placeholder.png"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg hover:underline">{product.name}</h3>
          <p className="text-gray-500 text-sm mb-2">{product.category_name}</p>
          <p className="font-bold text-lg mb-4">${selectedProductVariant.price}</p>
        </Link>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <label className="text-sm text-gray-500 mb-1 block">Size</label>
            <Select value={selectedProductVariant.size_id} onValueChange={handleSizeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {availableSizes.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-500 mb-1 block">Color</label>
            <Select value={selectedProductVariant.color_id} onValueChange={handleColorChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {product.variants.filter((pv) => pv.size_id === selectedProductVariant.size_id).map((pv) => (
                  <SelectItem key={pv.id} value={pv.color_id}>
                    {pv.color}
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
