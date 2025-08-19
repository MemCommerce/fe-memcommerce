import { useWishlist } from "@/hooks/useWishlist";
import CardSubmitbutton from "./CardSubmitbutton";

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

export default function FavoriteToggleForm({ productId, favoriteId }: FavoriteToggleFormProps) {
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  const handleToggle = async () => {
    const token = localStorage.getItem("authToken") ?? "";

    if (favoriteId) {
      const realFavorite = wishlistItems.find((item) => item.product_variant_id === productId);

      if (realFavorite) {
        await removeFromWishlist(realFavorite.id, token);
      } else {
        console.warn("Favorite item not found in current wishlist");
      }
    } else {
      await addToWishlist({ product_variant_id: productId, name: "Unknown product", price: 0 }, token);
    }
  };

  return <CardSubmitbutton isFavorite={!!favoriteId} onClick={handleToggle} />;
}
