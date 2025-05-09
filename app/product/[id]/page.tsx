"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { products } from "@/lib/data"
import { useCart } from "@/lib/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductCard from "@/components/shared/ProductCard"
import { ChevronLeft } from "lucide-react"

export default function ProductDetailPage({ params }) {
  const router = useRouter()
  const product = products.find((p) => p.id === params.id)

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "")
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "")
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  // If product not found, show error
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  // Generate additional product images (simulated)
  const productImages = [
    product.image,
    `/placeholder.svg?height=400&width=300&text=Image+2`,
    `/placeholder.svg?height=400&width=300&text=Image+3`,
    `/placeholder.svg?height=400&width=300&text=Image+4`,
  ]

  // Find related products (same category)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    })

    // Show confirmation
    alert("Product added to cart!")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" className="mb-6 flex items-center gap-1" onClick={() => router.back()}>
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative h-[400px] rounded-lg overflow-hidden border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {productImages.map((img, index) => (
              <div
                key={index}
                className="relative h-24 rounded-md overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity"
              >
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>

          <div className="border-t border-b py-4 my-6">
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="space-y-1 mb-4">
              <p>
                <strong>Category:</strong> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </p>
              <p>
                <strong>Material:</strong> Premium Cotton Blend
              </p>
              <p>
                <strong>Care:</strong> Machine wash cold, tumble dry low
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Size</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
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
          </div>

          <Button onClick={handleAddToCart} className="w-full py-6 text-lg" size="lg">
            Add to Cart
          </Button>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Product Details</h3>
            <p className="text-sm text-gray-600">
              This premium {product.name.toLowerCase()} is designed for comfort and style. Made with high-quality
              materials, it's perfect for everyday wear and special occasions. The {product.category} collection
              features modern designs that are both trendy and timeless.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div>
    </div>
  )
}
