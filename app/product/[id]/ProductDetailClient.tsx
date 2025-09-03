"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { useCart } from "@/hooks/useCart";
import AuthContext from "@/context/AuthContext";
import WishlistButton from "@/components/WishlistButton";
import { Button } from "@/components/ui/button";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";
import ProductOptions from "./ProductOptions";
import ProductReviews from "./ProductReviews";

import { CartLineItemData, SFProductWithReview, StorefrontVariant } from "@/lib/types";

export default function ProductDetailClient({
  product,
  productId,
}: {
  product: SFProductWithReview;
  productId: string;
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { token } = useContext(AuthContext);

  const [selectedProductVariant, setSelectedProductVariant] = useState<StorefrontVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const getVariantForReview = (variantId: string) => product.variants.find((variant) => variant.id === variantId);

  const averageRating =
    product.reviews.length > 0 ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length : 0;

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    const cartItem: CartLineItemData = {
      product_variant_id: selectedProductVariant.id,
      quantity,
      price: selectedProductVariant.price,
      name: product.name,
    };

    addToCart(cartItem, token);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 flex items-center gap-1" onClick={() => router.back()}>
        <ChevronLeft className="h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <ProductImages product={product} selectedVariant={selectedProductVariant} />
        <div>
          <ProductInfo
            name={product.name}
            description={product.description}
            categoryName={product.category_name}
            price={selectedProductVariant.price}
            id={productId}
          />

          <ProductOptions
            product={product}
            selectedVariant={selectedProductVariant}
            setSelectedVariant={setSelectedProductVariant}
            quantity={quantity}
            setQuantity={setQuantity}
          />

          <Button onClick={handleAddToCart} className="w-full py-6 text-lg" size="lg">
            Add to Cart
          </Button>

          <WishlistButton
            productId={productId}
            productName={product.name}
            productPrice={selectedProductVariant.price}
          />
        </div>
      </div>

      <ProductReviews
        reviews={product.reviews}
        getVariantForReview={getVariantForReview}
        averageRating={averageRating}
      />
    </div>
  );
}
