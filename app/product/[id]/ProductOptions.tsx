"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductOptionsProps } from "@/lib/types";

export default function ProductOptions({
  product,
  selectedVariant,
  setSelectedVariant,
  quantity,
  setQuantity,
}: ProductOptionsProps) {
  const availableSizes = product.variants.reduce((acc, variant) => {
    if (acc.map((s) => s.id).includes(variant.size_id)) return acc;
    return [...acc, { id: variant.size_id, label: variant.size }];
  }, [] as { id: string; label: string }[]);

  const handleSizeChange = (value: string) => {
    const newVariant = product.variants.find((v) => v.size_id === value)!;
    setSelectedVariant(newVariant);
  };

  const handleColorChange = (value: string) => {
    setSelectedVariant((prev) => product.variants.find((v) => v.color_id === value && v.size_id === prev!.size_id)!);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Size selector */}
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

      {/* Color selector */}
      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <Select value={selectedVariant.color_id} onValueChange={handleColorChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent>
            {product.variants
              .filter((v) => v.size_id === selectedVariant.size_id)
              .map((v) => (
                <SelectItem key={v.id} value={v.color_id}>
                  {v.color}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Quantity selector */}
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
    </div>
  );
}
