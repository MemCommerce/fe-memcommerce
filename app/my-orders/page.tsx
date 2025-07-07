"use client";

import AuthContext from "@/context/AuthContext";
import { OrderWithItems } from "@/lib/types";
import { use, useEffect, useState } from "react";
import { getUserOrders } from "../api/orderApi";

export default function MyOrdersPage() {
  const [ordersInfos, setOrdersInfos] = useState<OrderWithItems[]>([]);
  const { token } = use(AuthContext);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {ordersInfos.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        ordersInfos.map(({ order, order_items }) => (
          <div key={order.id} className="border rounded-lg p-4 shadow">
            <div className="mb-2">
              <span className="font-semibold">Order ID:</span> {order.id}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Status:</span> {order.status}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Name:</span> {order.full_name}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Email:</span> {order.email}
            </div>
            <div className="mb-2">
              <span className="font-semibold">Address:</span> {order.address}, {order.city}, {order.country}
            </div>
            <div>
              <span className="font-semibold">Items:</span>
              <ul className="ml-4 list-disc">
                {order_items.map(item => (
                  <li key={item.id} className="my-2 flex items-center">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover mr-3 rounded" />
                    )}
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div>Quantity: {item.quantity}</div>
                      <div>Price: ${item.price.toFixed(2)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
