import { Order, OrderData, OrderWithItems } from "@/lib/types";
import { ORDER_URL } from "@/lib/urls";

export const postOrder = async (orderData: OrderData, token: string): Promise<Order> => {
  const response = await fetch(ORDER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error placing order:", errorBody);
    throw new Error("Failed to place order");
  }
  const data: Order = await response.json();
  return data;
};

export const getOrderInfoById = async (orderId: string, token: string): Promise<OrderWithItems> => {
  const response = await fetch(`${ORDER_URL}order-info/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error fetching order info:", errorBody);
    throw new Error("Failed to fetch order info");
  }
  const data: OrderWithItems = await response.json();
  return data;
};

export const getUserOrders = async (token: string): Promise<OrderWithItems[]> => {
  const response = await fetch(`${ORDER_URL}user-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Error fetching user orders:", errorBody);
    throw new Error("Failed to fetch user orders");
  }
  const data: OrderWithItems[] = await response.json();
  return data;
};
