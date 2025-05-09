import { Color } from "@/lib/types";
import { COLORS_URL } from "@/lib/urls";

export const getColors = async (): Promise<Color[]> => {
    const resp = await fetch(COLORS_URL);
    const data: Color[] = await resp.json();
    return data;
};
