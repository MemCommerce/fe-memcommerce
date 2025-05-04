import CategoryPage from "@/components/category/CategoryPage"
import { products } from "@/lib/data"

export default function WomenPage() {
  const womenProducts = products.filter((product) => product.category === "women")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Women's Collection</h1>
      <CategoryPage products={womenProducts} />
    </div>
  )
}
