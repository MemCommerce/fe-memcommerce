import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function CategoryHighlights() {
  const categories = [
    {
      name: "Men",
      image: "/mens_category.png?height=600&width=400",
      link: "/men",
    },
    {
      name: "Women",
      image: "/womens_category.png?height=600&width=400",
      link: "/women",
    },
    {
      name: "Kids",
      image: "/kids_category.png?height=600&width=400",
      link: "/kids",
    },
  ]

  return (
    <section className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="group relative overflow-hidden rounded-lg">
            <div className="relative h-[400px] w-full">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">{category.name}</h3>
                  <Button asChild>
                    <a href={category.link}>Shop Now</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
