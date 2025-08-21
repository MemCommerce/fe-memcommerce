import { useWishlist } from "@/hooks/useWishlist";
import FavoriteToggleForm from "./FavoriteToggleForm";

type FavoriteToggleButtonProps = {
  productId: string;
  productName: string;
  productPrice: number;
};

export default function FavoriteToggleButton({ productId, productName, productPrice }: FavoriteToggleButtonProps) {
  const { wishlistItems } = useWishlist();

  const favorite = wishlistItems.find((item) => item.product_variant_id === productId);

  const favoriteId = favorite?.id ?? null;

  return (
    <FavoriteToggleForm
      productId={productId}
      favoriteId={favoriteId}
      productName={productName}
      productPrice={productPrice}
    />
  );
}
