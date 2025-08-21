import { Button } from "../ui/button";

import { Heart } from "lucide-react";

export default function CardSubmitbutton({ isFavorite, onClick }: { isFavorite: boolean; onClick?: () => void }) {
  return (
    <Button
      type="button"
      size="icon"
      variant={isFavorite ? "default" : "outline"}
      onClick={onClick}
      className="p-2 cursor-pointer"
    >
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current text-red-500" : ""}`} />
    </Button>
  );
}
