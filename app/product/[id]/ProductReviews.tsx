"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { ProductReviewsProps } from "@/lib/types";

export default function ProductReviews({ reviews, getVariantForReview, averageRating }: ProductReviewsProps) {
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

  if (reviews.length === 0) {
    return (
      <div className="mb-16 text-center py-12 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">No Reviews Yet</h2>
        <p className="text-gray-600 mb-6">Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        <div className="flex items-center gap-2">
          {renderStarRating(Math.round(averageRating))}

          <span className="text-lg font-medium">{averageRating.toFixed(1)}</span>
          <span className="text-gray-600">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => {
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
  );
}
