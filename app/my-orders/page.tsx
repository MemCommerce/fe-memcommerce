"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import AuthContext from "@/context/AuthContext";
import { OrderItem, OrderWithItems, Review, ReviewData } from "@/lib/types";
import { getUserOrders } from "../api/orderApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Package, MapPin, Mail, User, ShoppingBag, AlertCircle, MessageSquare, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewModal } from "@/components/review-modal";
import { postReview, putReview } from "../api/reviewApi";

export default function MyOrdersPage() {
  const [ordersInfos, setOrdersInfos] = useState<OrderWithItems[]>([]);
  const { token } = use(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [reviewModal, setReviewModal] = useState<{
    isOpen: boolean;
    productName: string;
    productVariantId: string;
    existingReview?: Review;
    isEditing: boolean;
    itemId: string;
  } | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const data = await getUserOrders(token);
        setOrdersInfos(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const calculateOrderTotal = (items: OrderItem[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // const formatDate = (dateString: string) => {
  //   return new Date(dateString).toLocaleDateString('en-US', {
  //     year: 'numeric',
  //     month: 'long',
  //     day: 'numeric'
  //   });
  // };

  const handleAddReview = (item: OrderItem) => {
    setReviewModal({
      isOpen: true,
      productName: item.name,
      productVariantId: item.product_variant_id || item.id, // Adjust based on your data structure
      isEditing: false,
      itemId: item.id,
    });
  };

  const handleEditReview = (item: OrderItem) => {
    setReviewModal({
      isOpen: true,
      productName: item.name,
      existingReview: item.review,
      isEditing: true,
      itemId: item.id,
      productVariantId: item.product_variant_id,
    });
  };

  const handleReviewSubmit = async (reviewData: ReviewData, reviewId: string | null) => {
    if (!reviewModal || !token) return;

    try {
      if (reviewId) {
        // For editing, we need the review ID - you might need to adjust this based on your data structure
        await putReview(reviewId, reviewData as ReviewData, token);
      } else {
        await postReview(reviewData as ReviewData, token);
      }

      // Refresh orders to show updated review status
      const data = await getUserOrders(token);
      setOrdersInfos(data);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  const closeReviewModal = () => {
    setReviewModal(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-6 w-20" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <Skeleton className="h-20 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your order history</p>
      </div>

      {ordersInfos.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500">When you place your first order, it will appear here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {ordersInfos.map(({ order, order_items }) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Order #{order.id}
                    </CardTitle>
                    {/* {order.created_at && (
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(order.created_at)}
                      </p>
                    )} */}
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-semibold text-lg">${calculateOrderTotal(order_items).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Customer:</span>
                      <span>{order.full_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">Email:</span>
                      <span>{order.email}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="font-medium">Shipping Address:</span>
                        <p className="text-gray-600">
                          {order.address}
                          <br />
                          {order.city}, {order.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div>
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Order Items ({order_items.length})
                  </h4>
                  <div className="space-y-4">
                    {order_items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        {item.image_url ? (
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={item.image_url || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover rounded-md"
                            />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center flex-shrink-0">
                            <Package className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-gray-900 truncate">{item.name}</h5>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>Qty: {item.quantity}</span>
                            <span>•</span>
                            <span>${item.price.toFixed(2)} each</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          {order.status === "delivered" && (
                            <Button
                              variant={item.review ? "outline" : "default"}
                              size="sm"
                              onClick={() => (item.review ? handleEditReview(item) : handleAddReview(item))}
                              className="flex items-center gap-1"
                            >
                              {item.review ? (
                                <>
                                  <Edit3 className="h-3 w-3" />
                                  Edit Review
                                </>
                              ) : (
                                <>
                                  <MessageSquare className="h-3 w-3" />
                                  Add Review
                                </>
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
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
          orderItemId={reviewModal.itemId}
          existingReview={reviewModal.existingReview}
          isEditing={reviewModal.isEditing}
        />
      )}
    </div>
  );
}
