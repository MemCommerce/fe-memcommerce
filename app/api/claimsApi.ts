import { ClaimWithItems } from "@/lib/types";
import { CLAIMS_URL } from "@/lib/urls"


export const getClaims = async (): Promise<ClaimWithItems[]> => {
  const resp = await fetch(CLAIMS_URL);

  if (!resp.ok) {
    throw new Error("Failed to fetch claims");
  }

  const data: ClaimWithItems[] = await resp.json();
  return data;
};