import { Size } from "@/lib/types";
import { SIZES_URL } from "@/lib/urls";

export const getSizes = async (): Promise<Size[]> => {
    const resp = await fetch(SIZES_URL);
    const data: Size[] = await resp.json();
    return data;
};
