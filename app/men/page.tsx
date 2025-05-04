import CategoryPage from "@/components/category/CategoryPage"
import { products } from "@/lib/data"

export default function MenPage() {
  const menProducts = products.filter((product) => product.category === "men")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Men's Collection</h1>
      <CategoryPage products={menProducts} />
    </div>
  )
}
