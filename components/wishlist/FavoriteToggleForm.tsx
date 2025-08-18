import { useWishlist } from "@/hooks/useWishlist";
import CardSubmitbutton from "./CardSubmitbutton";

type FavoriteToggleFormProps = {
  productId: string;
  favoriteId: string | null;
};

export default function FavoriteToggleForm({ productId, favoriteId }: FavoriteToggleFormProps) {
  const { addToWishlist, removeFromWishlist } = useWishlist();

  const handleToggle = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. User must be logged in.");
      return;
    }

    if (favoriteId) {
      await removeFromWishlist(favoriteId, token);
    } else {
      await addToWishlist(
        {
          product_variant_id: productId,
          name: "Unknown product",
          price: 0,
        },
        token
      );
    }
  };

  return <CardSubmitbutton isFavorite={!!favoriteId} onClick={handleToggle} />;
}
