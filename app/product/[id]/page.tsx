"use client"

import { use, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getStorefrontProductById } from "@/app/api/storefrontApi"
import { Size, StorefrontProduct, StorefrontVariant } from "@/lib/types"

// async function fetchStoreFrontProduct(productId: string) {
//    try {
//       const storefrontProductData = await getStorefrontProductById(productId);
//       const error = null;
//       return { data: storefrontProductData, error };
//     } catch (e) {
//       const error = e instanceof Error ? e.message : String(e);
//       const data: StorefrontProduct = {};
//       return { data, error };
//     }
// }


export default function ProductDetailPage({params}: {params: Promise<{ id: string }>}) {
  const router = useRouter()
  const [product, setProduct] = useState<StorefrontProduct | null>(null)
  const [selectedProductVariant, setSelectedProductVariant] = useState<StorefrontVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()
  const { id } = use(params)

  useEffect(() => {
    (async () => {
      const data = await getStorefrontProductById(id)
      setProduct(data)
      setSelectedProductVariant(data.variants[0])
    })()
  }, [params, id])

  // If product not found, show error
  if (!product || !selectedProductVariant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  const availableSizes: Size[] = product.variants.reduce<Size[]>((acc, variant) => {
      if (acc.map((s) => s.id).includes(variant.size_id)) return acc
      const size: Size = {
        id: variant.size_id,
        label: variant.size
      }
      return [...acc, size];
    }, []);

  // Find related products (same category)
  // const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedProductVariant.size,
      color: selectedProductVariant.color,
      price: selectedProductVariant.price,
      image_url: selectedProductVariant.image_url,
      quantity: 1,
    });

    // Show confirmation
    alert("Product added to cart!")
  }

   const handleSizeChange = (value: string) => {
    const newPvState = product.variants.find((pv) => pv.size_id === value)!
    setSelectedProductVariant(newPvState)
  }

  const handleColorChange = (value: string) => {
    setSelectedProductVariant((prev) => product.variants.find((pv) => pv.color_id === value && pv.size_id === prev!.size_id)!)
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
            <Image src={selectedProductVariant.image_url || "/t-shirt-placeholder.png"} alt={product.name} fill className="object-cover" />
          </div>

          {/* <div className="grid grid-cols-4 gap-2">
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
          </div> */}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${selectedProductVariant.price.toFixed(2)}</p>

          <div className="border-t border-b py-4 my-6">
            <p className="text-gray-700 mb-4">{product.description}</p>

            <div className="space-y-1 mb-4">
              <p>
                <strong>Category:</strong> {product.category_name.charAt(0).toUpperCase() + product.category_name.slice(1)}
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
              <Select value={selectedProductVariant.size_id} onValueChange={handleSizeChange}>
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
              <Select value={selectedProductVariant.color_id} onValueChange={handleColorChange}>
                <SelectTrigger className="w-full">
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
              materials, it&apos;s perfect for everyday wear and special occasions. The {product.category_name} collection
              features modern designs that are both trendy and timeless.
            </p>
          </div>
        </div>
      </div>

      {/* Related Products
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard key={relatedProduct.id} product={relatedProduct} />
          ))}
        </div>
      </div> */}
    </div>
  )
}
