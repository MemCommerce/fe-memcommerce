import { useWishlist } from "@/hooks/useWishlist";
import FavoriteToggleForm from "./FavoriteToggleForm";

export default function FavoriteToggleButton({ productId }: { productId: string }) {
  const { wishlistItems } = useWishlist();

  const favorite = wishlistItems.find((item) => item.product_variant_id === productId);

  const favoriteId = favorite?.id ?? null;

  return <FavoriteToggleForm productId={productId} favoriteId={favoriteId} />;
}
