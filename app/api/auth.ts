import { Tokens } from "@/lib/types";
import { AUTH_URL } from "@/lib/urls";

export const loginWithGoogle = async (returnUrl: string): Promise<string> => {
  try {
    const response = await fetch(`${AUTH_URL}login?return_url=${returnUrl}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to initiate Google login");
    }

    const data: string = await response.json();
    return data;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error;
  }
};

export const getTokens = async (refreshToken: string): Promise<Tokens> => {
  const url = `${AUTH_URL}refresh`
  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  })
  if (!resp.ok) {
    throw Error("Error on refreshing tokens!")
  }
  const data: Tokens = await resp.json()
  return data
}
