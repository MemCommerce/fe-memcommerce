import { ClaimWithItems } from "@/lib/types";
import { CLAIMS_URL } from "@/lib/urls";

export const getClaims = async (token: string): Promise<ClaimWithItems[]> => {
  const resp = await fetch(CLAIMS_URL, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resp.ok) {
    throw new Error("Failed to fetch claims");
  }

  const data: ClaimWithItems[] = await resp.json();

  return data;
};
