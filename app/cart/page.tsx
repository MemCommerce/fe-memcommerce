"use client";

import type React from "react";
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthContext from "@/context/AuthContext";
import { OrderData } from "@/lib/types";
import { OrderStatusEnum } from "@/lib/enums";
import { Alert, AlertDescription } from "@/components/ui/alert";

const initialFormState: OrderData = {
  full_name: "",
  email: "",
  address: "",
  city: "",
  country: "",
  status: OrderStatusEnum.PENDING,
};

export default function CartPage() {
  const { token } = useContext(AuthContext);
  const { cartLineItems, removeFromCart, updateQuantity, finishCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const order = await finishCart(formData, token!);
      router.push(`/order/${order.id}`);
    } catch (error) {
      console.error("Error placing order:", error);
      setAlertMessage("Failed to place order. Please try again.");
      setTimeout(() => setAlertMessage(""), 3000);
    }
  };

  const handleChangeQuantity = (cartLineItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(cartLineItemId, token!);
    } else {
      updateQuantity(cartLineItemId, newQuantity, token!);
    }
  };

  const subtotal = cartLineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {alertMessage && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartLineItems.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-medium text-gray-600">Your cart is empty</h2>
              <p className="mt-2 text-gray-500">Add some products to your cart to see them here.</p>
              <Button className="mt-4" asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartLineItems.map((item) => (
                <div key={`${item.id}`} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-20 h-20 relative flex-shrink-0">
                    <Image
                      src={item.image_url || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    {/* <p className="text-sm text-gray-500">
                      Size: {item.size}, Color: {item.color}
                    </p> */}
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() => handleChangeQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-l-md"
                        disabled={isLoading}
                        type="button"
                      >
                        -
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleChangeQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border rounded-r-md"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeFromCart(item.id, token!)}
                      className="text-sm text-red-500 mt-2"
                      type="button"
                      disabled={isLoading}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between p-4 border-t">
                <span className="font-medium">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Order Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input id="full_name" name="full_name" value={formData.full_name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" value={formData.country} onChange={handleChange} required />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={cartLineItems.length === 0 || isLoading}>
                Place Order
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
