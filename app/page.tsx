import HeroSection from "@/components/home/HeroSection"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import CategoryHighlights from "@/components/home/CategoryHighlights"
import ContactNewsletter from "@/components/home/ContactNewsletter"

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      <HeroSection />
      <FeaturedProducts />
      <CategoryHighlights />
      <ContactNewsletter />
    </div>
  )
}
