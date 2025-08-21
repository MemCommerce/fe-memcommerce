import { useWishlist } from "@/hooks/useWishlist";
import CardSubmitbutton from "./CardSubmitbutton";

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
  productName: string;
  productPrice: number;
};

export default function FavoriteToggleForm({
  productId,
  favoriteId,
  productName,
  productPrice,
}: FavoriteToggleFormProps) {
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
      await addToWishlist({ product_variant_id: productId, name: productName, price: productPrice }, token);
    }
  };

  return <CardSubmitbutton isFavorite={!!favoriteId} onClick={handleToggle} />;
}
