"use client"

import { useState } from "react"
import type { Product } from "@/lib/types"
import ProductCard from "@/components/shared/ProductCard"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CategoryPageProps } from "@/lib/interfaces"


export default function CategoryPage({ data }: CategoryPageProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const { colors, products, productVariants, categories, sizes} = data

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const sizeMatch = selectedSizes.length === 0 
      // || product?.sizes.some((size) => selectedSizes.includes(size))

    const colorMatch = selectedColors.length === 0 
      // || product?.colors.some((color) => selectedColors.includes(color))

    return sizeMatch && colorMatch
  })

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) => (prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]))
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const clearFilters = () => {
    setSelectedSizes([])
    setSelectedColors([])
  }

  console.log("productVariants")
  console.log(productVariants)

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
            {sizes.map((size) => (
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
            {colors.map((color) => (
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
        {filteredProducts.filter((product) => productVariants.map((pv) => pv.product_id).includes(product.id)).map((product) => (
          <ProductCard key={product.id} product={product} productVariants={productVariants.filter((pv) => pv.product_id === product.id)} sizes={sizes} colors={colors} categories={categories}/>
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
  )
}
