"use client";

import ProductCard from "@/components/shared/ProductCard";

export default function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6);

  return (
    <section id="featured-products" className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
