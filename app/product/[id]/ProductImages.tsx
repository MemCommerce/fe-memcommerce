import Image from "next/image";
import { SFProductWithReview, StorefrontVariant } from "@/lib/types";

export default function ProductImages({
  product,
  selectedVariant,
}: {
  product: SFProductWithReview;
  selectedVariant: StorefrontVariant;
}) {
  return (
    <div className="space-y-4">
      <div className="relative h-[400px] rounded-lg overflow-hidden border">
        <Image
          src={selectedVariant.image_url || "/t-shirt-placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
