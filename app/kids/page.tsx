import CategoryPage from "@/components/category/CategoryPage"
import { products } from "@/lib/data"

export default function KidsPage() {
  const kidsProducts = products.filter((product) => product.category === "kids")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Kids' Collection</h1>
      <CategoryPage products={kidsProducts} />
    </div>
  )
}
