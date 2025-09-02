"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Star } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStorefrontProductById } from "@/app/api/storefrontApi";
import { CartLineItemData, SFProductWithReview, Size, StorefrontVariant } from "@/lib/types";
import AuthContext from "@/context/AuthContext";
import ShareButton from "@/components/shared/ShareButton";
import WishlistButton from "@/components/WishlistButton";
import { useToast } from "@/components/ui/use-toast";


export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [product, setProduct] = useState<SFProductWithReview | null>(null);
  const [selectedProductVariant, setSelectedProductVariant] = useState<StorefrontVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { id } = use(params);
  const { token } = use(AuthContext);

  const { toast, ToastContainer: BaseToastContainer } = useToast();

  useEffect(() => {
    (async () => {
      const data = await getStorefrontProductById(id);
      setProduct(data);
      setSelectedProductVariant(data.variants[0]);
    })();
  }, [params, id]);

  if (!product || !selectedProductVariant) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-8">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    );
  }

  const availableSizes: Size[] = product.variants.reduce<Size[]>((acc, variant) => {
    if (acc.map((s) => s.id).includes(variant.size_id)) return acc;
    return [...acc, { id: variant.size_id, label: variant.size }];
  }, []);

const handleAddToCart = () => {
  if (!token) {
    toast({
      title: "Unauthorized",
      description: "Please log in to add items to your cart.",
      variant: "destructive",
    });
    return;
  }

  const cartItem: CartLineItemData = {
    product_variant_id: selectedProductVariant.id,
    quantity,
    price: selectedProductVariant.price,
    name: product.name,
  };

  addToCart(cartItem, token);

  toast({
    title: "Added to Cart",
    description: `${product.name} added successfully!`,
  });
};

  const handleSizeChange = (value: string) => {
    const newPvState = product.variants.find((pv) => pv.size_id === value)!;
    setSelectedProductVariant(newPvState);
  };

  const handleColorChange = (value: string) => {
    setSelectedProductVariant(
      (prev) => product.variants.find((pv) => pv.color_id === value && pv.size_id === prev!.size_id)!
    );
  };

  const renderStarRating = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
        />
      ))}
    </div>
  );

  const getVariantForReview = (variantId: string) => product.variants.find((variant) => variant.id === variantId);

  const averageRating =
    product.reviews.length > 0 ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" className="mb-6 flex items-center gap-1" onClick={() => router.back()}>
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="space-y-4">
          <div className="relative h-[400px] rounded-lg overflow-hidden border">
            <Image
              src={selectedProductVariant.image_url || "/t-shirt-placeholder.png"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <ShareButton name={product.name} productId={id} />
          <div className="flex items-center gap-3 mb-4">
            <p className="text-xl font-semibold">${selectedProductVariant.price.toFixed(2)}</p>
            {product.reviews.length > 0 && (
              <div className="flex items-center gap-2">
                {renderStarRating(Math.round(averageRating))}
                <span className="text-sm text-gray-600">
                  ({product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""})
                </span>
              </div>
            )}
          </div>

          <div className="border-t border-b py-4 my-6">
            <p className="text-foreground mb-4">{product.description}</p>
            <div className="space-y-1 mb-4">
              <p>
                <strong>Category:</strong>{" "}
                {product.category_name.charAt(0).toUpperCase() + product.category_name.slice(1)}
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
                  {product.variants
                    .filter((pv) => pv.size_id === selectedProductVariant.size_id)
                    .map((pv) => (
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
          <WishlistButton productId={id} productName={product.name} productPrice={selectedProductVariant.price} />

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">Product Details</h3>
            <p className="text-sm text-gray-600">
              This premium {product.name.toLowerCase()} is designed for comfort and style...
            </p>
          </div>
        </div>
      </div>

      {product.reviews.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Customer Reviews</h2>
            <div className="flex items-center gap-2">
              {renderStarRating(Math.round(averageRating))}
              <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
              <span className="text-gray-600">({product.reviews.length} reviews)</span>
            </div>
          </div>

          <div className="grid gap-6">
            {product.reviews.map((review) => {
              const variant = getVariantForReview(review.product_variant_id);
              return (
                <Card key={review.id} className="w-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{review.reviewer_name}</h4>
                          {renderStarRating(review.rating)}
                        </div>
                        {variant && (
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              Size: {variant.size}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">
                              Color: {variant.color}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    {review.title && <h5 className="font-medium text-gray-900 mt-2">{review.title}</h5>}
                  </CardHeader>
                  {review.content && (
                    <CardContent className="pt-0">
                      <p className="text-gray-700 leading-relaxed">{review.content}</p>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {product.reviews.length === 0 && (
        <div className="mb-16 text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">No Reviews Yet</h2>
          <p className="text-gray-600 mb-6">Be the first to review this product!</p>
          <Button variant="outline">Write a Review</Button>
        </div>
      )}

      {/* TOAST */}
      <BaseToastContainer />
    </div>
  );
}
