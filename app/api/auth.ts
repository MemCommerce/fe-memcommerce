import { AUTH_URL } from "@/lib/urls";

export const loginWithGoogle = async (): Promise<string> => {
  try {
    const response = await fetch(`${AUTH_URL}login`, {
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
