"use client";

import ShareButton from "@/components/shared/ShareButton";
import { ProductInfoProps } from "@/lib/interfaces";

export default function ProductInfo({ name, description, categoryName, price, id }: ProductInfoProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{name}</h1>
      <ShareButton name={name} productId={id} />

      <p className="text-xl font-semibold my-4">${price.toFixed(2)}</p>

      <div className="border-t border-b py-4 my-6">
        <p className="text-foreground mb-4">{description}</p>
        <div className="space-y-1 mb-4">
          <p>
            <strong>Category:</strong> {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </p>
          <p>
            <strong>Material:</strong> Premium Cotton Blend
          </p>
          <p>
            <strong>Care:</strong> Machine wash cold, tumble dry low
          </p>
        </div>
      </div>
    </div>
  );
}
