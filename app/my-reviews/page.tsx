"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { UserReview, ReviewData, Review } from "@/lib/types";
import { getUserReviews, putReview } from "../api/reviewApi";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Star, Package, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "@/components/review-modal";

export default function MyReviewsPage() {
  const { token } = use(AuthContext);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    productName: string;
    productVariantId: string;
    orderItemId: string;
    existingReview: Review;
  } | null>(null);

  useEffect(() => {
    if (!token) return;
    const fetchReviews = async () => {
      try {
        const data = await getUserReviews(token);
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to fetch reviews. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [token]);

  const handleEdit = (r: UserReview) => {
    setReviewModal({
      isOpen: true,
      productName: r.order_item.name,
      productVariantId: r.review.product_variant_id,
      orderItemId: r.order_item.id,
      existingReview: r.review,
    });
  };

  const handleReviewSubmit = async (reviewData: ReviewData, reviewId: string | null) => {
    if (!token) return;
    try {
      if (reviewId) {
        await putReview(reviewId, reviewData, token);
      }
      const data = await getUserReviews(token);
      setReviews(data);
    } catch (err) {
      console.error("Error updating review:", err);
    }
  };

  const closeReviewModal = () => setReviewModal(null);

  const renderStars = (rating: number) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-4 w-4 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Reviews</h1>
      {reviews.length === 0 ? (
        <p className="text-gray-600">You haven&apos;t written any reviews yet.</p>
      ) : (
        <div className="space-y-6">
          {reviews.map((r) => (
            <Card key={r.review.id}>
              <CardContent className="p-6 flex gap-4">
                {r.order_item.image_url ? (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={r.order_item.image_url}
                      alt={r.order_item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                    <Package className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-lg">{r.order_item.name}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(r)}
                      className="flex items-center gap-1"
                    >
                      <Edit3 className="h-3 w-3" /> Edit
                    </Button>
                  </div>
                  <div className="mt-2">{renderStars(r.review.rating)}</div>
                  {r.review.title && <p className="mt-2 font-medium">{r.review.title}</p>}
                  {r.review.content && (
                    <p className="text-sm text-gray-600 mt-1">{r.review.content}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {reviewModal && (
        <ReviewModal
          isOpen={reviewModal.isOpen}
          onClose={closeReviewModal}
          onSubmit={handleReviewSubmit}
          productName={reviewModal.productName}
          productVariantId={reviewModal.productVariantId}
          orderItemId={reviewModal.orderItemId}
          existingReview={reviewModal.existingReview}
          isEditing={true}
        />
      )}
    </div>
  );
}

