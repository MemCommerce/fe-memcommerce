"use client";

import { useEffect, useState } from "react";
import type { Color, Size, StorefrontProduct } from "@/lib/types";
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
import { STOREFRONT_URL } from "@/lib/urls";

export default function CategoryPage({ products: initialProducts }: CategoryPageProps) {
  const [products, setProducts] = useState<StorefrontProduct[]>(initialProducts);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  // Fetch products from backend 
  useEffect(() => {
    const fetchProducts = async () => {

      const params = new URLSearchParams();
   
      
      params.append("page", currentPage.toString());
      params.append("limit", itemsPerPage.toString());

      console.log(params, 'from params');

      if (selectedSizes.length > 0) params.append("sizes", selectedSizes.join(","));
      if (selectedColors.length > 0) params.append("colors", selectedColors.join(","));

      try {
        console.log(`${STOREFRONT_URL}paginated?${params.toString()}`);
        const res = await fetch(`${STOREFRONT_URL}paginated?${params.toString()}`);
        const data = await res.json();
        console.log(data, "from reposne");
        
        setProducts(data.items);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error("Failed to fetch paginated products:", error);
      }
    };
    fetchProducts();
  }, [currentPage, selectedSizes, selectedColors]);

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]));
    setCurrentPage(1);
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setCurrentPage(1);
  };

  // Available sizes and colors
  const availableSizes: Size[] = products
    .flatMap((p) => p.variants)
    .reduce<Size[]>((acc, v) => {
      if (!acc.find((s) => s.id === v.size_id)) acc.push({ id: v.size_id, label: v.size });
      return acc;
    }, []);

  const availableColors: Color[] = products
    .flatMap((p) => p.variants)
    .reduce<Color[]>((acc, v) => {
      if (!acc.find((c) => c.id === v.color_id)) acc.push({ id: v.color_id, name: v.color, hex: v.color_hex });
      return acc;
    }, []);

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
       {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}

      {products.length === 0 && (
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
