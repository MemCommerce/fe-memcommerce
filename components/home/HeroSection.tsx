import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Elevate Your Style With MemCommerce
          </h1>
          <p className="text-lg text-gray-600">
            Discover the latest trends in fashion with our curated collection of clothing for men, women, and kids.
          </p>
          <div className="pt-4">
            <Button size="lg" asChild>
              <a href="#featured-products">Shop Now</a>
            </Button>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <Image src="/placeholder.svg?height=1000&width=800" alt="Fashion collection" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
