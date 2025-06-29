"use client";

import { useState } from "react";
import type { Color, Size } from "@/lib/types";
import ProductCard from "@/components/shared/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryPageProps } from "@/lib/interfaces";

export default function CategoryPage({ products }: CategoryPageProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const availableSizes: Size[] = products.reduce<Size[]>((acc, p) => {
    const variants = p.variants;
    const sizes: Size[] = variants
      .filter((v) => !acc.map((s) => s.id).includes(v.size_id))
      .map((v) => {
        const sizeName = v.size;
        const sizeId = v.size_id;
        return {
          id: sizeId,
          label: sizeName,
        };
      });
    return [...acc, ...sizes];
  }, []);

  const availableColors: Color[] = products.reduce<Color[]>((acc, p) => {
    const variants = p.variants;
    const colors: Color[] = variants
      .filter((v) => !acc.map((c) => c.id).includes(v.color_id))
      .map((v) => {
        const colorName = v.color;
        const colorId = v.color_id;
        const hex = v.color_hex;
        return {
          id: colorId,
          name: colorName,
          hex: hex,
        };
      });
    return [...acc, ...colors];
  }, []);

  // Filter products based on selected filters
  const filteredProducts = products.filter(() => {
    const sizeMatch = selectedSizes.length === 0;
    // || product?.sizes.some((size) => selectedSizes.includes(size))

    const colorMatch = selectedColors.length === 0;
    // || product?.colors.some((color) => selectedColors.includes(color))

    return sizeMatch && colorMatch;
  });

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4 mb-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Size
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableSizes.map((size) => (
              <DropdownMenuCheckboxItem
                key={size.id}
                checked={selectedSizes.includes(size.label)}
                onCheckedChange={() => toggleSize(size.label)}
              >
                {size.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              Color
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {availableColors.map((color) => (
              <DropdownMenuCheckboxItem
                key={color.id}
                checked={selectedColors.includes(color.name)}
                onCheckedChange={() => toggleColor(color.name)}
              >
                {color.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {(selectedSizes.length > 0 || selectedColors.length > 0) && (
          <Button variant="ghost" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium text-gray-600">No products found</h2>
          <p className="mt-2 text-gray-500">Try changing your filters or check back later.</p>
          <Button className="mt-4" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
