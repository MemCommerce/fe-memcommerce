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
      // DEcoding user_id
      const decoded: { sub: string } = JSON.parse(atob(token.split(".")[1]));
      const userId = decoded.sub;

      const realFavorite = wishlistItems.find(
        (item) => item.product_variant_id === productId && item.user_id === userId
      );

      if (realFavorite) {
        await removeFromWishlist(realFavorite.id, token);
      } else {
        console.warn("Trying to remove guest item → ignored");
      }
    } else {
      await addToWishlist({ product_variant_id: productId, name: "Unknown product", price: 0 }, token);
    }
  };

  return <CardSubmitbutton isFavorite={!!favoriteId} onClick={handleToggle} />;
}
