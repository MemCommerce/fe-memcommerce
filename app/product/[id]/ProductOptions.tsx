"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WishlistButton from "@/components/WishlistButton";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";
import { CartLineItemData, ProductOptionsProps, StorefrontVariant } from "@/lib/types";

export default function ProductOptions({
  productId,
  productName,
  variants,
  availableSizes,
  token,
}: ProductOptionsProps) {
  const { addToCart } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<StorefrontVariant>(variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    const cartItem: CartLineItemData = {
      product_variant_id: selectedVariant.id,
      quantity,
      price: selectedVariant.price,
      name: productName,
    };

    addToCart(cartItem, token);
    toast.success(`${productName} added to cart!`);
  };

  const handleSizeChange = (value: string) => {
    const newVariant = variants.find((v) => v.size_id === value)!;
    setSelectedVariant(newVariant);
  };

  const handleColorChange = (value: string) => {
    setSelectedVariant((prev) => variants.find((v) => v.color_id === value && v.size_id === prev!.size_id)!);
  };

  return (
    <div className="space-y-4 mb-6">
      <div>
        <label className="block text-sm font-medium mb-1">Size</label>
        <Select value={selectedVariant.size_id} onValueChange={handleSizeChange}>
          <SelectTrigger className="w-full">
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
        <label className="block text-sm font-medium mb-1">Color</label>
        <Select value={selectedVariant.color_id} onValueChange={handleColorChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            {variants
              .filter((v) => v.size_id === selectedVariant.size_id)
              .map((v) => (
                <SelectItem key={v.id} value={v.color_id}>
                  {v.color}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Quantity</label>
        <div className="flex items-center">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center border rounded-l-md"
          >
            -
          </button>
          <span className="w-12 h-10 flex items-center justify-center border-t border-b">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center border rounded-r-md"
          >
            +
          </button>
        </div>
      </div>

      <Button onClick={handleAddToCart} className="w-full py-6 text-lg" size="lg">
        Add to Cart
      </Button>
      <WishlistButton productId={productId} productName={productName} productPrice={selectedVariant.price} />
    </div>
  );
}
