import { Category } from "@/lib/types";
import { CATEGORIES_URL } from "@/lib/urls";

export const getCategories = async (): Promise<Category[]> => {
    const resp = await fetch(CATEGORIES_URL);
    const data: Category[] = await resp.json();
    return data;
};
