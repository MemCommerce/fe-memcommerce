"use client";

import { getOrderInfoById } from "@/app/api/orderApi";
import AuthContext from "@/context/AuthContext";
import { OrderWithItems } from "@/lib/types";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const [orderInfo, setOrderInfo] = useState<OrderWithItems | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = use(params);
  const { token } = use(AuthContext);

  useEffect(() => {
    if (!token) return;
    const fetchOrderInfo = async () => {
      try {
        const data = await getOrderInfoById(id, token); // Replace with actual token
        setOrderInfo(data);
      } catch (error) {
        console.error("Error fetching order info:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderInfo();
  }, [token, id]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  if (!orderInfo) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Order not found</h1>
        <p className="mb-8">The order you&apos;re looking for doesn&apos;t exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="mb-6">
        <div>
          <strong>Name:</strong> {orderInfo.order.full_name}
        </div>
        <div>
          <strong>Email:</strong> {orderInfo.order.email}
        </div>
        <div>
          <strong>Address:</strong> {orderInfo.order.address}, {orderInfo.order.city}, {orderInfo.order.country}
        </div>
        <div>
          <strong>Status:</strong> {orderInfo.order.status}
        </div>
      </div>
      <h2 className="text-xl font-semibold mb-2">Items</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderInfo.order_items.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">
                {item.image_url ? (
                  <div className="h-12 w-12 relative">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover rounded"
                    />
                  </div>
                ) : (
                  <span>No image</span>
                )}
              </td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.quantity}</td>
              <td className="border px-4 py-2">${item.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
